
    
document.addEventListener('DOMContentLoaded', async function() {
  const loading = document.getElementById('__bundler_loading');
  function setStatus(msg) { if (loading) loading.textContent = msg; }

  // Error sink persists across replaceWith since it's on window, not the DOM.
  window.addEventListener('error', function(e) {
    var p = document.body || document.documentElement;
    var d = document.getElementById('__bundler_err') || p.appendChild(document.createElement('div'));
    d.id = '__bundler_err';
    d.style.cssText = 'position:fixed;bottom:12px;left:12px;right:12px;font:12px/1.4 ui-monospace,monospace;background:#2a1215;color:#ff8a80;padding:10px 14px;border-radius:8px;border:1px solid #5c2b2e;z-index:99999;white-space:pre-wrap;max-height:40vh;overflow:auto';
    d.textContent = (d.textContent ? d.textContent + String.fromCharCode(10) : '') +
      '[bundle] ' + (e.message || e.type) +
      (e.filename ? ' (' + e.filename.slice(0, 60) + ':' + e.lineno + ')' : '');
  }, true);

  try {
    const manifestEl = document.querySelector('script[type="__bundler/manifest"]');
    const templateEl = document.querySelector('script[type="__bundler/template"]');
    if (!manifestEl || !templateEl) {
      setStatus('Error: missing bundle data');
      console.error('[bundler] Missing script tags — manifestEl:', !!manifestEl, 'templateEl:', !!templateEl);
      return;
    }

    const manifest = JSON.parse(manifestEl.textContent);
    const templateData = JSON.parse(templateEl.textContent);
    const pages = templateData.pages;
    const entryId = templateData.entry;
    const pageIds = Object.keys(pages);

    const extResEl = document.querySelector('script[type="__bundler/ext_resources"]');
    const extResources = extResEl ? JSON.parse(extResEl.textContent) : {};

    const uuids = Object.keys(manifest);
    setStatus('Unpacking ' + uuids.length + ' assets...');

    const blobUrls = {};
    await Promise.all(uuids.map(async (uuid) => {
      const entry = manifest[uuid];
      try {
        const binaryStr = atob(entry.data);
        const bytes = new Uint8Array(binaryStr.length);
        for (let i = 0; i < binaryStr.length; i++) bytes[i] = binaryStr.charCodeAt(i);

        let finalBytes = bytes;
        if (entry.compressed) {
          if (typeof DecompressionStream !== 'undefined') {
            const ds = new DecompressionStream('gzip');
            const writer = ds.writable.getWriter();
            const reader = ds.readable.getReader();
            writer.write(bytes);
            writer.close();
            const chunks = [];
            let totalLen = 0;
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              chunks.push(value);
              totalLen += value.length;
            }
            finalBytes = new Uint8Array(totalLen);
            let offset = 0;
            for (const chunk of chunks) { finalBytes.set(chunk, offset); offset += chunk.length; }
          } else {
            console.warn('DecompressionStream not available, asset ' + uuid + ' may not render');
          }
        }

        blobUrls[uuid] = URL.createObjectURL(new Blob([finalBytes], { type: entry.mime }));
      } catch (err) {
        console.error('Failed to decode asset ' + uuid + ':', err);
        blobUrls[uuid] = URL.createObjectURL(new Blob([], { type: entry.mime }));
      }
    }));

    // Per-page prep: substitute UUIDs, strip SRI/crossorigin (blob URLs from a
    // file:// document inherit a null origin, so crossorigin forces a CORS
    // fetch that SRI then rejects — the manifest bytes are ours; SRI protects
    // against CDN compromise, not this), and inject the page's own
    // window.__resources + the click interceptor into <head>. slice() rather
    // than replace() keeps us clear of $-pattern substitution.
    function resourcesFor(id) {
      var map = {};
      var list = extResources[id] || [];
      for (var k = 0; k < list.length; k++) {
        if (blobUrls[list[k].uuid]) map[list[k].id] = blobUrls[list[k].uuid];
      }
      return map;
    }
    for (const id of pageIds) {
      let t = pages[id];
      for (const uuid of uuids) t = t.split(uuid).join(blobUrls[uuid]);
      t = t.replace(/\s+integrity="[^"]*"/gi, '').replace(/\s+crossorigin="[^"]*"/gi, '');
      // The click interceptor owns every anchor click (not a <base target>):
      // a blanket <base target="_parent"> would also redirect form submissions
      // and tear down the wrapper. Non-# links navigate the parent to the
      // anchor's resolved href; #/… routes forward to the parent's hash only
      // when the id is one of this bundle's own pages (author #/… links from
      // an in-page hash router are left to the scroll path so they don't yank
      // the user to the entry page); plain #frag scrolls in place.
      // composedPath + getAttribute('target') handle SVG <a> and shadow-DOM
      // anchors, which closest()/IDL .target get wrong.
      var headContent = 'window.__resources = ' + JSON.stringify(resourcesFor(id)) + ';' +
        (pageIds.length > 1 ?
          'window.__bundler_pages = ' + JSON.stringify(pageIds) + ';' +
          'document.addEventListener("click", function(e){' +
            'if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;' +
            'var a = null, p = e.composedPath ? e.composedPath() : [e.target];' +
            'for (var j = 0; j < p.length && !a; j++) {' +
              'var n = p[j], tn = n && n.tagName;' +
              'if (tn === "A" || tn === "a" || tn === "AREA") a = n;' +
            '}' +
            'if (!a && e.target.closest) a = e.target.closest("a, area");' +
            'if (!a || a.hasAttribute("download")) return;' +
            'var tg = a.getAttribute("target");' +
            'if (tg && tg !== "_self") return;' +
            'var h = a.getAttribute("href") || a.getAttribute("xlink:href");' +
            'if (!h || /^javascript:/i.test(h)) return;' +
            'if (h.charAt(0) !== "#") {' +
              'if (!tg) { var b = document.querySelector("base[target]"); if (b && b.getAttribute("target") !== "_self") return; }' +
              'e.preventDefault();' +
              'if (/^(?:[a-z][a-z0-9+.-]*:|\\/\\/)/i.test(h)) parent.location.assign(h);' +
              'return;' +
            '}' +
            'e.preventDefault();' +
            'if (h.slice(0, 2) === "#/") {' +
              'var c = h.indexOf(":", 2);' +
              'var pid = c < 0 ? h.slice(2) : h.slice(2, c);' +
              'try { pid = decodeURIComponent(pid); } catch(err) {}' +
              'if (window.__bundler_pages.indexOf(pid) >= 0) { parent.location.hash = h; return; }' +
            '}' +
            'var t = h.length > 1 ? document.getElementById(h.slice(1)) : null;' +
            'if (t) t.scrollIntoView({behavior:"smooth"});' +
            'else scrollTo({top:0, behavior:"smooth"});' +
          '});' : '');
      // Defuse any script end-tag sequence in the content (resource ids, page
      // ids) before wrapping — same escape level as every sibling JSON island.
      var headScript = '<script>' +
        headContent.split('</' + 'script').join('<\\/' + 'script') +
        '</' + 'script>';
      // Inject after <head> so the DOCTYPE stays first; prepending the script
      // would push the parser into quirks mode. DOMParser always emits a <head>
      // (synthesizing one if the source HTML omitted it) but may carry
      // attributes through, so match the full opening tag.
      var headOpen = t.match(/<head[^>]*>/i);
      if (headOpen) {
        var hi = headOpen.index + headOpen[0].length;
        t = t.slice(0, hi) + headScript + t.slice(hi);
      }
      pages[id] = t;
    }

    setStatus('Rendering...');

    if (pageIds.length === 1) {
      // Single page: the pre-crawl render path. Parse the template and swap the
      // root element. Scripts inserted via DOMParser/replaceWith are inert per
      // spec — re-create each with createElement so they execute, awaiting
      // onload for src scripts to preserve ordering (React before ReactDOM
      // before Babel before text/babel).
      var template = pages[entryId];
      const doc = new DOMParser().parseFromString(template, 'text/html');
      document.documentElement.replaceWith(doc.documentElement);
      const dead = Array.from(document.scripts);
      for (const old of dead) {
        const s = document.createElement('script');
        for (const a of old.attributes) s.setAttribute(a.name, a.value);
        s.textContent = old.textContent;
        // text/babel scripts with a src: fetch and inline. transformScriptTags
        // does XHR against the src, but blob:null/ from a file:// origin is
        // silently dropped. Inlining makes it a plain inline babel script,
        // which transformScriptTags handles unconditionally.
        if ((s.type === 'text/babel' || s.type === 'text/jsx') && s.src) {
          try {
            const r = await fetch(s.src);
            s.textContent = await r.text();
            s.removeAttribute('src');
          } catch (e) {}
        }
        // Non-executable script types (text/babel, application/json, …) are
        // data blocks per spec: the browser never fetches src and never fires
        // load/error, so awaiting would hang forever.
        const exec = !s.type || s.type === 'module' || /(java|ecma)script/i.test(s.type);
        const p = (s.src && exec) ? new Promise(function(r) { s.onload = s.onerror = r; }) : null;
        old.replaceWith(s);
        if (p) await p;
      }
      // Babel standalone auto-transforms type=text/babel on DOMContentLoaded,
      // which fired before we swapped the document. Trigger manually if present.
      if (window.Babel && typeof window.Babel.transformScriptTags === 'function') {
        window.Babel.transformScriptTags();
      }
      return;
    }

    // Multi-page: render into a full-viewport srcdoc iframe so each page runs
    // in its own realm while staying same-origin with the parent (so asset
    // blob URLs load and parent.location is writable).
    var frame = document.createElement('iframe');
    frame.id = '__bundler_frame';
    frame.setAttribute('style', 'position:fixed;inset:0;width:100%;height:100%;border:0;background:#fff');
    document.body.appendChild(frame);

    function decode(s) {
      try { return decodeURIComponent(s); } catch (e) { return s; }
    }
    function route() {
      var h = (location.hash || '');
      if (h.slice(0, 2) !== '#/') return { id: entryId, anchor: '' };
      h = h.slice(2);
      var i = h.indexOf(':');
      return i < 0 ? { id: decode(h), anchor: '' }
                   : { id: decode(h.slice(0, i)), anchor: decode(h.slice(i + 1)) };
    }

    var current = null;
    var navGen = 0;
    function navigate() {
      var r = route();
      var id = Object.prototype.hasOwnProperty.call(pages, r.id) ? r.id : entryId;
      if (current === id) {
        // Same-page anchor change: the iframe's own hash handles this, so
        // normally we don't reach here. If we do (e.g. a programmatic
        // parent.location.hash change), nudge the iframe.
        var cw = frame.contentWindow;
        if (!cw) return;
        var el = r.anchor && cw.document.getElementById(r.anchor);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else cw.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      current = id;
      var gen = ++navGen;
      frame.onload = function() {
        // One-shot: an iframe-internal navigation (form submit, page JS
        // location.href=) re-fires onload with the same gen; after that the
        // iframe may be cross-origin, and cw.* access would throw.
        frame.onload = null;
        if (gen !== navGen) return;
        var cw = frame.contentWindow;
        try { cw.document.title && (document.title = cw.document.title); } catch (e) {}
        var splash = document.getElementById('__bundler_thumbnail') ||
                     document.getElementById('__bundler_placeholder');
        if (splash) splash.remove();
        if (loading) loading.remove();
        var el = r.anchor && cw.document.getElementById(r.anchor);
        if (el) el.scrollIntoView();
        else cw.scrollTo(0, 0);
      };
      frame.srcdoc = pages[id];
    }

    window.addEventListener('hashchange', navigate);
    navigate();
  } catch (err) {
    setStatus('Error unpacking: ' + err.message);
    console.error('Bundle unpack error:', err);
  }
});

  