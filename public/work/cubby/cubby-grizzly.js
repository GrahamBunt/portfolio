// Dependency-free custom element. SVG identifiers are isolated by Shadow DOM.
class CubbyGrizzly extends HTMLElement {
  connectedCallback() {
    if (this.controller) return;
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' }).innerHTML = `
      <style>
        :host{display:block;width:100%;aspect-ratio:1;contain:layout style}
        button{all:unset;display:block;width:100%;height:100%;cursor:pointer;border-radius:40%;-webkit-tap-highlight-color:transparent}
        button:focus-visible{outline:2px solid #996b3b;outline-offset:-24px}
        svg{display:block;width:100%;height:100%;overflow:visible}
      </style>
      <button type="button" aria-label="Say hello to little grizzly"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1254 1254" fill="none" aria-hidden="true">
<defs>
  <radialGradient id="fur" cx=".39" cy=".17" r=".89"><stop stop-color="#dba360"/><stop offset=".38" stop-color="#b87736"/><stop offset=".72" stop-color="#98501f"/><stop offset=".92" stop-color="#653115"/><stop offset="1" stop-color="#4c2208"/></radialGradient>
  <radialGradient id="ear" cx=".41" cy=".17" r=".9"><stop stop-color="#d49a56"/><stop offset=".58" stop-color="#aa672e"/><stop offset="1" stop-color="#5a2604"/></radialGradient>
  <radialGradient id="inner" cx=".57" cy=".85" r=".85"><stop stop-color="#b46b23"/><stop offset=".63" stop-color="#85410c"/><stop offset=".88" stop-color="#542400"/><stop offset="1" stop-color="#391802"/></radialGradient>
  <radialGradient id="cream" cx=".40" cy=".24" r=".83"><stop stop-color="#ffe5b3"/><stop offset=".59" stop-color="#f7cf8b"/><stop offset=".84" stop-color="#d6a45c"/><stop offset="1" stop-color="#ac7736"/></radialGradient>
  <radialGradient id="nose" cx=".4" cy=".16" r=".85"><stop stop-color="#785c44"/><stop offset=".35" stop-color="#412b1b"/><stop offset=".8" stop-color="#241509"/><stop offset="1" stop-color="#130d08"/></radialGradient>
  <radialGradient id="eye" cx=".37" cy=".22" r=".8"><stop stop-color="#3b4244"/><stop offset=".3" stop-color="#101414"/><stop offset=".56" stop-color="#010303"/><stop offset=".85" stop-color="#020404"/><stop offset=".96" stop-color="#202725"/><stop offset="1" stop-color="#080b09"/></radialGradient>
  <radialGradient id="shine"><stop stop-color="#fff"/><stop offset=".7" stop-color="#e5eded"/><stop offset="1" stop-color="#a7b4b6"/></radialGradient>
  <linearGradient id="mouthInk" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#241509"/><stop offset="1" stop-color="#442207"/></linearGradient>
  <filter id="suede" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
    <feTurbulence type="fractalNoise" baseFrequency=".32 .48" numOctaves="3" seed="12" result="noise"/>
    <feDiffuseLighting in="noise" surfaceScale=".95" diffuseConstant="1.15" lighting-color="#fff" result="nap"><feDistantLight azimuth="235" elevation="60"/></feDiffuseLighting>
    <feComposite in="SourceGraphic" in2="nap" operator="arithmetic" k1="1" k2="0" k3="0" k4="0"/>
    <feComposite in2="SourceGraphic" operator="in"/>
  </filter>
  <filter id="muzzleShadow" x="-30%" y="-25%" width="160%" height="170%"><feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#311400" flood-opacity=".48"/></filter>
  <filter id="noseShadow" x="-25%" y="-25%" width="150%" height="160%"><feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#58310e" flood-opacity=".34"/></filter>
  <filter id="blur"><feGaussianBlur stdDeviation="14"/></filter>
</defs>
<ellipse data-part="shadow" cx="627" cy="1072" rx="254" ry="21" fill="#7d4a20" opacity=".15" filter="url(#blur)"/>
<g data-part="head">
  <g transform="translate(28 24) translate(365 490) scale(1.08) translate(-365 -490)"><g data-part="ear-left">
    <path d="M282 501C246 468 248 402 280 368C312 334 361 345 391 374C415 399 418 440 402 480Z" fill="url(#ear)" filter="url(#suede)"/>
    <path d="M288 460C276 438 280 409 296 391C313 372 338 380 354 397C369 413 370 436 359 455Z" fill="url(#inner)" filter="url(#suede)"/>
  </g>
  </g>
  <g transform="translate(-28 24) translate(889 490) scale(1.08) translate(-889 -490)"><g data-part="ear-right">
    <path d="M852 480C836 440 839 399 863 374C893 345 942 334 974 368C1006 402 1008 468 972 501Z" fill="url(#ear)" filter="url(#suede)"/>
    <path d="M895 455C884 436 885 413 900 397C916 380 941 372 958 391C974 409 978 438 966 460Z" fill="url(#inner)" filter="url(#suede)"/>
  </g>
  </g>
  <!-- A broad crown, slight forelock, heavy cheeks and a soft, squared jaw. -->
  <path d="M559 348C571 327 591 312 619 307C611 321 607 335 611 344C637 324 668 319 695 326C682 334 674 344 670 354C787 342 887 392 946 494C985 562 1005 647 1016 737C1028 836 1009 897 951 940C893 983 779 1001 627 1001C475 1001 361 983 303 940C245 897 226 836 238 737C249 647 269 562 308 494C367 392 467 342 559 348Z" fill="url(#fur)" filter="url(#suede)"/>
  <g data-part="face">
    <!-- Shallow, warm brows give the smaller eyes a curious expression. -->
    <path d="M413 590C431 575 455 573 473 582" stroke="#edb573" stroke-opacity=".38" stroke-width="15" stroke-linecap="round"/>
    <path d="M781 582C799 573 823 575 841 590" stroke="#edb573" stroke-opacity=".38" stroke-width="15" stroke-linecap="round"/>
    <g data-part="eyes">
      <g transform="translate(447 657) scale(1.10)"><g data-part="eye-left"><ellipse rx="33" ry="42" fill="#603006" opacity=".35" transform="translate(0 3)"/><ellipse rx="30" ry="39" fill="url(#eye)" stroke="#251704" stroke-width="2"/><g data-part="glint-left"><ellipse cx="-5" cy="-18" rx="9" ry="9" fill="url(#shine)"/><ellipse cx="8" cy="17" rx="4" ry="6" fill="#c4d0d0" opacity=".15"/></g></g></g>
      <g transform="translate(807 657) scale(1.10)"><g data-part="eye-right"><ellipse rx="33" ry="42" fill="#603006" opacity=".35" transform="translate(0 3)"/><ellipse rx="30" ry="39" fill="url(#eye)" stroke="#251704" stroke-width="2"/><g data-part="glint-right"><ellipse cx="-5" cy="-18" rx="9" ry="9" fill="url(#shine)"/><ellipse cx="8" cy="17" rx="4" ry="6" fill="#c4d0d0" opacity=".15"/></g></g></g>
    </g>
    <g data-part="muzzle">
      <path d="M627 666C591 666 568 684 546 704C523 724 472 739 449 776C426 813 435 860 469 893C505 929 558 942 627 942C696 942 749 929 785 893C819 860 828 813 805 776C782 739 731 724 708 704C686 684 663 666 627 666Z" fill="url(#cream)" filter="url(#muzzleShadow)"/>
      <path d="M627 666C591 666 568 684 546 704C523 724 472 739 449 776C426 813 435 860 469 893C505 929 558 942 627 942C696 942 749 929 785 893C819 860 828 813 805 776C782 739 731 724 708 704C686 684 663 666 627 666Z" fill="url(#cream)" filter="url(#suede)"/>
      <path data-part="mouth" fill="url(#mouthInk)" d="M619 803H633V836C633 847 650 861 664 861C670 861 675 858 676 853C681 844 693 851 687 862C672 885 641 871 626 856C611 871 580 885 565 862C559 851 571 844 576 853C577 858 582 861 588 861C602 861 619 847 619 836Z"/>
      <path d="M627 726C592 726 554 729 547 749C538 777 594 817 627 817C660 817 716 777 707 749C700 729 662 726 627 726Z" fill="url(#nose)" filter="url(#noseShadow)"/>
      <path d="M627 726C592 726 554 729 547 749C538 777 594 817 627 817C660 817 716 777 707 749C700 729 662 726 627 726Z" fill="url(#nose)" filter="url(#suede)"/>
      <g fill="#926136" opacity=".26"><circle cx="492" cy="799" r="3"/><circle cx="513" cy="814" r="3"/><circle cx="490" cy="827" r="2.5"/><circle cx="762" cy="799" r="3"/><circle cx="741" cy="814" r="3"/><circle cx="764" cy="827" r="2.5"/></g>
    </g>
  </g>
</g>
</svg>
</button>`;
    this.controller = new AbortController();
    const signal = this.controller.signal;
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
  static get observedAttributes() { return ['paused']; }
  attributeChangedCallback() { if (this.controller) this.sync(); }
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
  render(x, y, blink, hello) {
    const p = this.parts;
    const breath = this.active ? Math.sin(this.elapsed * 1.45) * 2.3 : 0;
    const nod = hello * Math.sin((this.elapsed - this.helloAt) * 9) * 3;
    p.head.setAttribute('transform', `translate(${x * 9} ${y * 5 + breath - hello * 9}) rotate(${x * 3 + nod} 627 850)`);
    p.face.setAttribute('transform', `translate(${x * 24} ${y * 15})`);
    p.eyes.setAttribute('transform', `translate(${this.gaze.x * 6} ${this.gaze.y * 5})`);
    for (const side of ['left', 'right']) {
      p[`eye-${side}`].setAttribute('transform', `scale(${1 - Math.abs(x) * .035} ${Math.max(.06, blink * (1 - hello * .35))})`);
      p[`glint-${side}`].setAttribute('transform', `translate(${this.gaze.x * 5} ${this.gaze.y * 4})`);
    }
    p.muzzle.setAttribute('transform', `translate(${x * 12} ${y * 9 - hello * 3})`);
    p['ear-left'].setAttribute('transform', `translate(${-x * 3} ${y * -1.5}) rotate(${-hello * 3} 365 490)`);
    p['ear-right'].setAttribute('transform', `translate(${-x * 3} ${y * -1.5}) rotate(${hello * 3} 889 490)`);
    // One filled outline joins the stem and both smile branches without a seam.
    // Keep the junction fixed while the outer corners lift during a greeting.
    const lift = hello * 8;
    p.mouth.setAttribute('d', `M619 803H633V836C633 847 650 861 664 861C670 861 675 ${858 - lift} 676 ${853 - lift}C681 ${844 - lift} 693 ${851 - lift} 687 ${862 - lift}C672 885 641 871 626 856C611 871 580 885 565 ${862 - lift}C559 ${851 - lift} 571 ${844 - lift} 576 ${853 - lift}C577 ${858 - lift} 582 861 588 861C602 861 619 847 619 836Z`);
    p.shadow.setAttribute('opacity', String(.15 - hello * .035));
  }
  disconnectedCallback() {
    cancelAnimationFrame(this.frame); this.controller?.abort(); this.observer?.disconnect(); this.controller = null;
  }
}
if (!customElements.get('cubby-grizzly')) customElements.define('cubby-grizzly', CubbyGrizzly);
