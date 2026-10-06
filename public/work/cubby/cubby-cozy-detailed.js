// Dependency-free custom element. SVG identifiers are isolated by Shadow DOM.
class CubbyCozyDetailed extends HTMLElement {
  connectedCallback() {
    if (this.controller) return;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host{display:block;width:100%;aspect-ratio:1;contain:layout style}
        button{all:unset;position:relative;display:block;width:100%;height:100%;cursor:pointer;border-radius:40%;-webkit-tap-highlight-color:transparent}
        button:focus-visible{outline:2px solid #996b3b;outline-offset:-24px}
        .shadow{position:absolute;inset:0;pointer-events:none}
        .breathing{display:block;width:100%;height:100%;will-change:transform}
        svg{display:block;width:100%;height:100%;overflow:visible}
      </style>
      <button type="button" aria-label="Say hello to Detailed Cozy Grizzly">
      <svg class="shadow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" fill="none" aria-hidden="true"><defs><filter id="shadow-blur"><feGaussianBlur stdDeviation="14" /></filter></defs><ellipse data-part="shadow" cx="627" cy="1025" rx="254" ry="21" fill="#7d4a20" opacity=".15" filter="url(#shadow-blur)" /></svg>
      <span class="breathing"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" fill="none" aria-hidden="true">
<defs>
  <radialGradient id="fur" cx=".39" cy=".17" r=".89"><stop stop-color="#dba360" /><stop offset=".38" stop-color="#b87736" /><stop offset=".72" stop-color="#98501f" /><stop offset=".92" stop-color="#653115" /><stop offset="1" stop-color="#4c2208" /></radialGradient>
  <radialGradient id="ear" cx=".41" cy=".17" r=".9"><stop stop-color="#d49a56" /><stop offset=".58" stop-color="#aa672e" /><stop offset="1" stop-color="#5a2604" /></radialGradient>
  <radialGradient id="inner" cx=".57" cy=".85" r=".85"><stop stop-color="#b46b23" /><stop offset=".63" stop-color="#85410c" /><stop offset=".88" stop-color="#542400" /><stop offset="1" stop-color="#391802" /></radialGradient>
  <radialGradient id="cream" cx=".40" cy=".24" r=".83"><stop stop-color="#fff0d2" /><stop offset=".59" stop-color="#f6d9a5" /><stop offset=".84" stop-color="#dbb47d" /><stop offset="1" stop-color="#c09259" /></radialGradient>
  <radialGradient id="nose" cx=".4" cy=".16" r=".85"><stop stop-color="#785c44" /><stop offset=".35" stop-color="#412b1b" /><stop offset=".8" stop-color="#241509" /><stop offset="1" stop-color="#130d08" /></radialGradient>
  <radialGradient id="eye" cx=".37" cy=".22" r=".8"><stop stop-color="#3b4244" /><stop offset=".3" stop-color="#101414" /><stop offset=".56" stop-color="#010303" /><stop offset=".85" stop-color="#020404" /><stop offset=".96" stop-color="#202725" /><stop offset="1" stop-color="#080b09" /></radialGradient>
  <radialGradient id="shine"><stop stop-color="#fff" /><stop offset=".7" stop-color="#e5eded" /><stop offset="1" stop-color="#a7b4b6" /></radialGradient>
  <linearGradient id="mouthInk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#241509" /><stop offset="1" stop-color="#442207" /></linearGradient>
  <filter id="suede" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".32 .48" numOctaves="3" seed="12" result="noise" />
    <feDiffuseLighting in="noise" surfaceScale=".95" diffuseConstant="1.15" lighting-color="#fff" result="nap"><feDistantLight azimuth="235" elevation="60" /></feDiffuseLighting>
    <!-- Keep the fine grain subtle at the small empty-state size. -->
    <feComposite in="SourceGraphic" in2="nap" operator="arithmetic" k1="${this.hasAttribute('accessory') ? '.15' : '1'}" k2="${this.hasAttribute('accessory') ? '.85' : '0'}" k3="0" k4="0" />
    <feComposite in2="SourceGraphic" operator="in" />
  </filter>
  <filter id="muzzleShadow" x="-30%" y="-25%" width="160%" height="170%"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#311400" flood-opacity=".20" /></filter>
  <filter id="noseShadow" x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#58310e" flood-opacity=".34" /></filter>
</defs>
<g data-part="head">
<g transform="translate(380 535) scale(.95) translate(-365 -490)"><g data-part="ear-left">
    <path d="M282 501C246 468 248 402 280 368C312 334 361 345 391 374C415 399 418 440 402 480Z" fill="url(#ear)" filter="url(#suede)" />
    <path d="M288 460C276 438 280 409 296 391C313 372 338 380 354 397C369 413 370 436 359 455Z" fill="url(#inner)" filter="url(#suede)" />
  </g>
  </g><g transform="translate(874 535) scale(.95) translate(-889 -490)"><g data-part="ear-right">
    <path d="M852 480C836 440 839 399 863 374C893 345 942 334 974 368C1006 402 1008 468 972 501Z" fill="url(#ear)" filter="url(#suede)" />
    <path d="M895 455C884 436 885 413 900 397C916 380 941 372 958 391C974 409 978 438 966 460Z" fill="url(#inner)" filter="url(#suede)" />
  </g>
  </g><path d="M559 378C571 357 591 342 619 337C611 351 607 365 611 374C637 354 668 349 695 356C682 364 674 374 670 384C802 384 901 426 952.5 516C1005 596.5 1026 694.5 1022.5 789C1019 915 889.5 957 627 957C364.5 957 235 915 231.5 789C228 694.5 249 596.5 301.5 516C358 426 451 384 559 378Z" fill="url(#fur)" filter="url(#suede)" />
<g data-part="face">
<path d="M627 495C399.5 495 340 607 340 757.5C340 866 434.5 887 627 887C819.5 887 914 866 914 757.5C914 607 854.5 495 627 495Z" fill="url(#cream)" filter="url(#muzzleShadow)" />
<path d="M627 495C399.5 495 340 607 340 757.5C340 866 434.5 887 627 887C819.5 887 914 866 914 757.5C914 607 854.5 495 627 495Z" fill="url(#cream)" filter="url(#suede)" />
<path d="M776 582C791 574 812 573 831 584" stroke="#ba8b4f" stroke-opacity=".27" stroke-width="12" stroke-linecap="round" /><path d="M423 584C442 573 463 574 478 582" stroke="#ba8b4f" stroke-opacity=".27" stroke-width="12" stroke-linecap="round" /><g data-part="eyes"><g transform="translate(459 642)"><g data-part="eye-left"><circle r="36.75" fill="url(#eye)" /><g data-part="glint-left"><circle cx="-10" cy="-13" r="8" fill="url(#shine)" opacity=".86" /><circle cx="12" cy="15" r="3.5" fill="#d9d9cb" opacity=".16" /></g></g></g><g transform="translate(795 642)"><g data-part="eye-right"><circle r="36.75" fill="url(#eye)" /><g data-part="glint-right"><circle cx="-10" cy="-13" r="8" fill="url(#shine)" opacity=".86" /><circle cx="12" cy="15" r="3.5" fill="#d9d9cb" opacity=".16" /></g></g></g></g>
<g transform="translate(627 780) scale(.82) translate(-627 -804)"><g data-part="muzzle">
      <path data-part="mouth" fill="url(#mouthInk)" d="M619 803H633V836C633 847 650 861 664 861C670 861 675 858 676 853C681 844 693 851 687 862C672 885 641 871 626 856C611 871 580 885 565 862C559 851 571 844 576 853C577 858 582 861 588 861C602 861 619 847 619 836Z" stroke="url(#mouthInk)" stroke-width="4" stroke-linejoin="round" />
      <path d="M627 726C592 726 554 729 547 749C538 777 594 817 627 817C660 817 716 777 707 749C700 729 662 726 627 726Z" fill="url(#nose)" filter="url(#noseShadow)" />
      <path d="M627 726C592 726 554 729 547 749C538 777 594 817 627 817C660 817 716 777 707 749C700 729 662 726 627 726Z" fill="url(#nose)" filter="url(#suede)" />
      </g>
  </g></g><g data-part="accessory">${this.accessoryMarkup()}</g></g></svg></span></button>`;
    this.controller = new AbortController();
    const signal = this.controller.signal;
    this.breathing = this.shadowRoot.querySelector('.breathing');
    this.renderedAttributes = new WeakMap();
    this.parts = Object.fromEntries([...this.shadowRoot.querySelectorAll('[data-part]')].map(el => [el.dataset.part, el]));
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)');
    this.target = { x: 0, y: 0 }; this.pose = { x: 0, y: 0 }; this.velocity = { x: 0, y: 0 };
    this.gaze = { x: 0, y: 0 }; this.lastTime = 0; this.elapsed = 0; this.blinkAt = 2.8; this.blinkStart = -10; this.helloAt = -10;
    this.inView = true;
    const listen = (node, type, fn) => node.addEventListener(type, fn, { signal });
    listen(window, 'pointermove', event => {
      if (event.pointerType === 'touch' || !this.active) return;
      const box = this.getBoundingClientRect();
      this.target.x = Math.max(-1, Math.min(1, (event.clientX - box.x - box.width / 2) / (box.width * .85)));
      this.target.y = Math.max(-1, Math.min(1, (event.clientY - box.y - box.height * .53) / (box.height * .85)));
    });
    const reset = () => { this.target.x = 0; this.target.y = 0; };
    listen(document.documentElement, 'pointerleave', reset);
    listen(window, 'blur', reset);
    listen(window, 'scroll', reset);
    listen(this.shadowRoot.querySelector('button'), 'click', () => this.greet());
    listen(this.shadowRoot.querySelector('button'), 'keydown', event => {
      const directions = { ArrowLeft: [-.8, 0], ArrowRight: [.8, 0], ArrowUp: [0, -.8], ArrowDown: [0, .8] };
      if (directions[event.key] && this.active) {
        event.preventDefault(); [this.target.x, this.target.y] = directions[event.key];
      }
    });
    listen(this.shadowRoot.querySelector('button'), 'blur', reset);
    listen(document, 'visibilitychange', () => this.sync());
    listen(this.reduced, 'change', () => this.sync());
    this.observer = new IntersectionObserver(entries => { this.inView = entries[0].isIntersecting; this.sync(); });
    this.observer.observe(this);
    this.sync();
  }
  // Small objects held below the face; the approved head, texture and expression
  // remain intact. Props inherit the head motion and the existing breathing layer.
  accessoryMarkup() {
    const paw = (x, y, rotation) => `<g transform="translate(${x} ${y}) rotate(${rotation})"><ellipse rx="47" ry="60" fill="url(#fur)" filter="url(#suede)"/><path d="M-21-27V-10M-2-32V-15M17-25V-9" stroke="#633914" stroke-opacity=".45" stroke-width="7" stroke-linecap="round"/></g>`;
    switch (this.getAttribute('accessory')) {
      case 'clipboard': return `
        <g transform="translate(0 28)"><g transform="rotate(-7 627 980)" filter="url(#muzzleShadow)">
          <rect x="472" y="838" width="310" height="285" rx="29" fill="#975924"/>
          <rect x="482" y="842" width="290" height="265" rx="22" fill="#c18d51"/>
          <rect x="503" y="862" width="248" height="221" rx="10" fill="url(#cream)"/>
          <path d="M584 852V836Q584 819 601 819H653Q670 819 670 836V852" stroke="#6c5138" stroke-width="15" stroke-linejoin="round"/>
          <rect x="570" y="842" width="114" height="28" rx="9" fill="#8f795b"/>
          <path d="M539 927H716M539 972H694M539 1017H708" stroke="#b29870" stroke-width="11" stroke-linecap="round"/>
        </g>${paw(478, 985, -17)}${paw(778, 958, 18)}</g>`;
      case 'camera': return `
        <g filter="url(#muzzleShadow)">
          <path d="M534 879L554 841H676L697 879" fill="#697362" stroke="#485342" stroke-width="10" stroke-linejoin="round"/>
          <rect x="467" y="864" width="70" height="26" rx="9" fill="#8f6540"/>
          <rect x="443" y="879" width="368" height="208" rx="38" fill="#53604c"/>
          <rect x="450" y="879" width="354" height="73" rx="30" fill="#8c9780"/>
          <path d="M454 941H800" stroke="#c3c4a5" stroke-opacity=".45" stroke-width="5"/>
          <rect x="734" y="903" width="40" height="26" rx="7" fill="#ede1bd"/>
          <circle cx="627" cy="985" r="91" fill="#aa9976"/>
          <circle cx="627" cy="985" r="76" fill="#343e36" stroke="#ded2b0" stroke-width="5"/>
          <circle cx="627" cy="985" r="56" fill="#172d2b"/>
          <circle cx="615" cy="971" r="33" fill="#314d44"/>
          <path d="M601 951Q617 940 634 947" stroke="#a4b3a1" stroke-opacity=".65" stroke-width="10" stroke-linecap="round"/>
        </g>${paw(449, 984, -17)}${paw(805, 984, 17)}`;
      case 'pencil': return `
        <g transform="translate(791 785) rotate(34)" filter="url(#muzzleShadow)">
          <rect x="-44" y="0" width="88" height="286" rx="10" fill="#dba54a"/>
          <path d="M-44 75H-15V286H-44Z" fill="#ad722c"/>
          <path d="M13 75H36V286H13Z" fill="#f0c66d"/>
          <path d="M-44 286L0 368L44 286Z" fill="#edd0a0"/>
          <path d="M-15 340L0 368L15 340Z" fill="#49382a"/>
          <path d="M-44 26Q-44 0-18 0H18Q44 0 44 26V62H-44Z" fill="#bb8271"/>
          <path d="M-44 55H44V88H-44Z" fill="#c5b69b"/>
          <path d="M-44 65H44M-44 79H44" stroke="#93866e" stroke-width="5"/>
        </g>${paw(720, 961, 28)}`;
      default: return '';
    }
  }
  static get observedAttributes() { return ['paused', 'accessory']; }
  attributeChangedCallback(name) {
    if (name === 'accessory') {
      const prop = this.shadowRoot?.querySelector('[data-part="accessory"]');
      if (prop) prop.innerHTML = this.accessoryMarkup();
    }
    if (this.controller) this.sync();
  }
  get active() { return !this.hasAttribute('paused') && !this.reduced.matches && !document.hidden && this.inView; }
  sync() {
    cancelAnimationFrame(this.frame); this.lastTime = 0;
    if (this.active) this.frame = requestAnimationFrame(time => this.tick(time));
    else {
      this.target = { x: 0, y: 0 }; this.pose = { x: 0, y: 0 }; this.gaze = { x: 0, y: 0 }; this.velocity = { x: 0, y: 0 };
      this.helloAt = -10; this.blinkStart = -10;
      this.render(0, 0, 1, 0);
    }
  }
  greet() {
    this.dispatchEvent(new CustomEvent('cubbyhello', { bubbles: true }));
    if (this.active) this.helloAt = this.elapsed;
  }
  tick(time) {
    if (!this.active) return;
    const dt = this.lastTime ? Math.min((time - this.lastTime) / 1000, .032) : 1 / 60;
    this.lastTime = time; this.elapsed += dt;
    // Damped spring for the head; eyes acquire their target sooner.
    for (const axis of ['x', 'y']) {
      this.velocity[axis] += ((this.target[axis] - this.pose[axis]) * 65 - this.velocity[axis] * 15) * dt;
      this.pose[axis] += this.velocity[axis] * dt;
      this.gaze[axis] += (this.target[axis] - this.gaze[axis]) * (1 - Math.exp(-18 * dt));
    }
    if (this.elapsed >= this.blinkAt) {
      this.blinkStart = this.elapsed; this.blinkAt = this.elapsed + 3.4 + Math.random() * 3;
    }
    const b = (this.elapsed - this.blinkStart) / .19;
    const blink = b >= 0 && b <= 1 ? 1 - .94 * Math.sin(b * Math.PI) ** 2 : 1;
    const h = this.elapsed - this.helloAt;
    const hello = h >= 0 && h < 1.5 ? Math.sin(h / 1.5 * Math.PI) ** 2 : 0;
    this.render(this.pose.x, this.pose.y, blink, hello);
    this.frame = requestAnimationFrame(next => this.tick(next));
  }
  // Setting an identical SVG attribute still invalidates rendering in browsers.
  // Preserve the exact animation values, but leave unchanged geometry alone.
  setPartAttribute(part, name, value) {
    let attributes = this.renderedAttributes.get(part);
    if (!attributes) {
      attributes = new Map();
      this.renderedAttributes.set(part, attributes);
    }
    if (attributes.get(name) === value) return;
    attributes.set(name, value);
    part.setAttribute(name, value);
  }
  render(x, y, blink, hello) {
    const p = this.parts;
    const breath = this.active ? Math.sin(this.elapsed * 1.45) * 2.3 : 0;
    // Translate a composited HTML layer instead of invalidating all the SVG's
    // turbulence/lighting filters for every breathing frame. The shadow stays
    // fixed and the SVG keeps its original geometry, texture and resolution.
    this.breathing.style.transform = `translate3d(0, ${breath / 1254 * 100}%, 0)`;
    const nod = hello * Math.sin((this.elapsed - this.helloAt) * 9) * 3;
    this.setPartAttribute(p.head, 'transform', `translate(${x * 9} ${y * 5 - hello * 9}) rotate(${x * 3 + nod} 627 850)`);
    this.setPartAttribute(p.face, 'transform', `translate(${x * 24} ${y * 15})`);
    this.setPartAttribute(p.eyes, 'transform', `translate(${this.gaze.x * 6} ${this.gaze.y * 5})`);
    for (const side of ['left', 'right']) {
      this.setPartAttribute(p[`eye-${side}`], 'transform', `scale(${1 - Math.abs(x) * .035} ${Math.max(.06, blink * (1 - hello * .35))})`);
      this.setPartAttribute(p[`glint-${side}`], 'transform', `translate(${this.gaze.x * 5} ${this.gaze.y * 4})`);
    }
    this.setPartAttribute(p.muzzle, 'transform', `translate(${x * 12} ${y * 9 - hello * 3})`);
    this.setPartAttribute(p['ear-left'], 'transform', `translate(${-x * 3} ${y * -1.5}) rotate(${-hello * 3} 365 490)`);
    this.setPartAttribute(p['ear-right'], 'transform', `translate(${-x * 3} ${y * -1.5}) rotate(${hello * 3} 889 490)`);
    // One filled outline joins the stem and both smile branches without a seam.
    // Keep the junction fixed while the outer corners lift during a greeting.
    const lift = hello * 8;
    this.setPartAttribute(p.mouth, 'd', `M619 803H633V836C633 847 650 861 664 861C670 861 675 ${858 - lift} 676 ${853 - lift}C681 ${844 - lift} 693 ${851 - lift} 687 ${862 - lift}C672 885 641 871 626 856C611 871 580 885 565 ${862 - lift}C559 ${851 - lift} 571 ${844 - lift} 576 ${853 - lift}C577 ${858 - lift} 582 861 588 861C602 861 619 847 619 836Z`);
    this.setPartAttribute(p.shadow, 'opacity', String(.15 - hello * .035));
  }
  disconnectedCallback() {
    cancelAnimationFrame(this.frame); this.controller?.abort(); this.observer?.disconnect(); this.controller = null;
  }
}
if (!customElements.get('cubby-cozy-detailed')) customElements.define('cubby-cozy-detailed', CubbyCozyDetailed);
