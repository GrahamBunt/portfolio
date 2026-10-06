"use client";

import { createElement, Fragment, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type MouseEvent } from 'react';
import { sampleNotes, sampleScreenshots, type DemoNote } from './demo-content';
import styles from './CubbyDemoApp.module.css';
import { selectRange, updateNote, deletionTargets } from './demo-interactions';
import { EntryAction } from './EntryAction';

type Tab = 'clipboard' | 'screenshots' | 'notes';
const tabs: Tab[] = ['clipboard', 'screenshots', 'notes'];
const labels = { clipboard: 'Clipboard', screenshots: 'Screenshots', notes: 'Notes' };
type IconName = Tab | 'copy' | 'delete' | 'check' | 'submit' | 'edit';

function Icon({ name }: { name: IconName }) {
  if (name === 'edit') return <svg aria-hidden="true" className={styles.icon} viewBox="0 0 22 22" fill="none">
    <path transform="translate(5.5 5.5) scale(.4583333333)" d="M3 16 16 3Q18 1 20 3L21 4Q23 6 21 8L8 21 2 22ZM14 5 19 10" stroke="currentColor" strokeWidth="1.963636" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
  return <span aria-hidden="true" className={styles.icon}
    style={{ '--icon': `url('/work/cubby/demo/${name}.png')` } as CSSProperties} />;
}

function Day({ label }: { label: string }) {
  return <div className={styles.day}><span>{label}</span></div>;
}

function Actions({ time, label, copy, remove, edit, selectedCount = 1 }: { time: string; label: string; copy: () => Promise<void>; remove: () => void; edit?: () => void; selectedCount?: number }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const onCopy = async (event: MouseEvent) => {
    event.stopPropagation();
    try {
      await copy();
      setFailed(false);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 900);
    } catch {
      setFailed(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setFailed(false), 2500);
    }
  };
  return <div className={styles.meta}>
    <time>{time}</time>
    <span className={styles.actions}>
      <EntryAction label={`Copy ${label}`} tooltip={failed ? 'Copy unavailable in this browser' : 'Copy'} onClick={onCopy} className={copied ? styles.copied : undefined}>
        <Icon name={copied ? 'check' : 'copy'} />
      </EntryAction>
      {edit && <EntryAction label="Edit note" tooltip="Edit" onClick={edit}><Icon name="edit" /></EntryAction>}
      <EntryAction label={`Delete ${label}`} tooltip={selectedCount > 1 ? `Delete ${selectedCount} Selected Items` : 'Delete'} onClick={remove}><Icon name="delete" /></EntryAction>
    </span>
    <span className={styles.srOnly} role="status">{copied ? 'Copied' : failed ? 'Copy was blocked by the browser. Nothing was copied.' : ''}</span>
  </div>;
}

function NoteEditor({ text, onChange }: { text: string; onChange: (text: string) => void }) {
  const field = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const input = field.current;
    if (!input) return;
    const feed = input.closest<HTMLElement>('[data-demo-feed]');
    const scrollTop = feed?.scrollTop ?? 0;
    input.style.height = '16px';
    input.style.height = `${input.scrollHeight}px`;
    if (feed) feed.scrollTop = scrollTop;
  }, [text]);
  useEffect(() => {
    const input = field.current;
    input?.focus({ preventScroll: true });
    const row = input?.closest<HTMLElement>('[data-entry-id]');
    const feed = input?.closest<HTMLElement>('[data-demo-feed]');
    if (row && feed) {
      // Keep the editor footer reachable without scrolling the case-study page.
      const bottom = row.offsetTop + row.offsetHeight;
      if (bottom > feed.scrollTop + feed.clientHeight) feed.scrollTop = bottom - feed.clientHeight;
    }
  }, []);
  return <textarea ref={field} className={styles.noteEditor} aria-label="Edit note text" value={text}
    onChange={event => onChange(event.target.value)} rows={1} />;
}

async function copyScreenshot(src: string) {
  // Keep the clipboard write in the click's activation chain, including Safari.
  const png = fetch(src).then(response => {
    if (!response.ok) throw new Error('Screenshot unavailable');
    return response.blob();
  });
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': png })]);
}

export function CubbyDemoApp() {
  const [tab, setTab] = useState<Tab>('clipboard');
  const [notes, setNotes] = useState<DemoNote[]>(sampleNotes);
  const [screenshots, setScreenshots] = useState(sampleScreenshots);
  const [draft, setDraft] = useState('');
  const [editing, setEditing] = useState<Record<string, string>>({});
  const [composerFocused, setComposerFocused] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [latestNote, setLatestNote] = useState<string>();
  const [announcement, setAnnouncement] = useState('');
  const anchor = useRef<string | null>(null);
  const focusedShot = useRef<string | null>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  const editor = useRef<HTMLTextAreaElement>(null);
  const scrollOnUpdate = useRef(true);
  const [deleting, setDeleting] = useState<string[]>([]);
  const deleteTimers = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  useLayoutEffect(() => {
    const container = wrapper.current;
    if (!container) return;
    const observer = new ResizeObserver(([entry]) => {
      canvas.current?.style.setProperty('--demo-scale', String(entry.contentRect.width / 360));
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timers = deleteTimers.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const app = canvas.current;
    if (!app) return;
    const onWheel = (event: WheelEvent) => {
      const activeFeed = feed.current;
      // Preserve browser zoom and horizontal gestures. Clipboard is decorative.
      if (!activeFeed || event.ctrlKey || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const target = event.target;
      const textEditor = editor.current;
      // Keep native scrolling and momentum inside the feed or a long draft.
      // CSS contains those gestures at their boundaries.
      if (target instanceof Node && (
        (activeFeed.contains(target) && activeFeed.scrollHeight > activeFeed.clientHeight)
        || (textEditor?.contains(target) && textEditor.scrollHeight > textEditor.clientHeight)
      )) return;
      // The header, wooden frame, and composer also belong to the active feed.
      // A non-passive local listener prevents these gestures moving the page.
      event.preventDefault();
      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? activeFeed.clientHeight : 1;
      activeFeed.scrollTop += event.deltaY * unit;
    };
    app.addEventListener('wheel', onWheel, { passive: false });
    return () => app.removeEventListener('wheel', onWheel);
  }, []);

  useLayoutEffect(() => {
    const scrollTop = feed.current?.scrollTop ?? 0;
    if (editor.current) {
      editor.current.style.height = '20px';
      editor.current.style.height = `${Math.min(240, Math.max(20, editor.current.scrollHeight))}px`;
    }
    if (scrollOnUpdate.current && feed.current) {
      feed.current.scrollTop = feed.current.scrollHeight;
      scrollOnUpdate.current = false;
    } else if (feed.current) {
      // Resizing the composer must not move the notes someone is reading.
      feed.current.scrollTop = scrollTop;
    }
  }, [tab, notes, screenshots, draft]);

  const changeTab = (next: Tab) => {
    if (next === tab) return;
    setTab(next);
    setSelected([]);
    anchor.current = null;
    focusedShot.current = null;
    scrollOnUpdate.current = true;
  };

  const select = (id: string, event: { shiftKey: boolean; metaKey: boolean; ctrlKey: boolean }) => {
    const ids = (tab === 'screenshots' ? screenshots : notes).map(item => item.id);
    // Text rows remember ordinary clicks only as the next Shift-click anchor.
    setSelected(previous => tab === 'notes' && !event.shiftKey && !event.metaKey && !event.ctrlKey
      ? []
      : selectRange(ids, previous, anchor.current, id, event.shiftKey, event.metaKey || event.ctrlKey));
    if (!event.shiftKey || !anchor.current) anchor.current = id;
    focusedShot.current = id;
  };

  const remove = (ids: string[], from: Tab) => {
    setDeleting(previous => [...new Set([...previous, ...ids])]);
    const finish = () => {
      if (from === 'notes') setNotes(previous => previous.filter(item => !ids.includes(item.id)));
      else setScreenshots(previous => previous.filter(item => !ids.includes(item.id)));
      setSelected(previous => previous.filter(id => !ids.includes(id)));
      setDeleting(previous => previous.filter(id => !ids.includes(id)));
      if (anchor.current && ids.includes(anchor.current)) anchor.current = null;
      if (focusedShot.current && ids.includes(focusedShot.current)) focusedShot.current = null;
      setAnnouncement(ids.length === 1 ? 'Item deleted' : `${ids.length} items deleted`);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else {
      const timer = setTimeout(() => { finish(); deleteTimers.current.delete(timer); }, 280);
      deleteTimers.current.add(timer);
    }
  };

  const submit = () => {
    if (!draft.trim()) return;
    const id = crypto.randomUUID();
    const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }).toLowerCase();
    setNotes(previous => [...previous, { id, text: draft.trim(), day: 'Today', time }]);
    setDraft('');
    setEditing({});
    setLatestNote(id);
    setSelected([]);
    scrollOnUpdate.current = true;
    setAnnouncement('Note added');
    editor.current?.focus({ preventScroll: true });
  };

  const finishEditing = (id: string, save: boolean) => {
    if (save) {
      setNotes(previous => updateNote(previous, id, editing[id]));
      setAnnouncement('Note saved');
    }
    setEditing(previous => {
      const next = { ...previous };
      delete next[id];
      return next;
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLButtonElement) return;
    if (tab === 'clipboard' || window.getSelection()?.toString()) return;
    if (event.key === 'Escape') { setSelected([]); anchor.current = null; return; }
    if (event.key === 'Backspace' || event.key === 'Delete') {
      if (selected.length && !event.metaKey && !event.ctrlKey && !event.altKey) { event.preventDefault(); remove(selected, tab); }
    }
    if (tab !== 'screenshots') return;
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'a') {
      event.preventDefault(); setSelected(screenshots.map(item => item.id));
      anchor.current = screenshots[0]?.id ?? null;
      focusedShot.current = screenshots.at(-1)?.id ?? null;
    }
    if (event.metaKey || event.ctrlKey || event.altKey) return;
    const direction = ['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : ['ArrowRight', 'ArrowDown'].includes(event.key) ? 1 : 0;
    if (direction && screenshots.length) {
      event.preventDefault();
      const current = screenshots.findIndex(item => item.id === focusedShot.current);
      const index = current < 0 ? screenshots.length - 1 : Math.min(screenshots.length - 1, Math.max(0, current + direction));
      const id = screenshots[index].id;
      select(id, event);
      // Scroll only the app feed; never move the surrounding case study.
      const tile = feed.current?.querySelector<HTMLElement>(`[data-entry-id="${id}"]`);
      if (tile && feed.current) feed.current.scrollTop = tile.offsetTop - feed.current.clientHeight / 2 + tile.offsetHeight / 2;
    }
  };

  return <div className={styles.wrapper} ref={wrapper}>
    <div className={styles.app} data-cubby-demo ref={canvas} onKeyDown={onKeyDown}>
      <header className={styles.header}>
        <div role="tablist" aria-label="Cubby feeds" className={styles.tabs}>
          {tabs.map(name => <button type="button" role="tab" key={name} id={`cubby-demo-tab-${name}`} aria-selected={tab === name}
            aria-controls="cubby-demo-panel" aria-label={labels[name]} tabIndex={tab === name ? 0 : -1}
            onClick={() => changeTab(name)}
            onKeyDown={event => {
              const index = tabs.indexOf(name);
              const next = event.key === 'ArrowRight' ? tabs[(index + 1) % 3] : event.key === 'ArrowLeft' ? tabs[(index + 2) % 3] : event.key === 'Home' ? tabs[0] : event.key === 'End' ? tabs[2] : null;
              if (next) { event.preventDefault(); changeTab(next); document.getElementById(`cubby-demo-tab-${next}`)?.focus({ preventScroll: true }); }
            }}><Icon name={name} />
              <span className={styles.tabLabel}><span>{labels[name]}</span></span>
              {tab !== name && <span className={styles.tabTooltip} role="tooltip">{labels[name]}</span>}
            </button>)}
        </div>
        <span className={styles.kebab} aria-hidden="true">•••</span>
      </header>
      <div className={`${styles.panel} ${tab === 'screenshots' ? styles.screenshotPanel : ''}`} id="cubby-demo-panel" role="tabpanel" aria-labelledby={`cubby-demo-tab-${tab}`} tabIndex={0}>
        <div className={styles.clipboard} hidden={tab !== 'clipboard'}>
          <div className={styles.samples} aria-hidden="true">
            <Day label="Today" />
            {['https://grahambunt.com', 'A little home for the things you copy.'].map((text, index) => <div className={styles.sample} key={text}>
              <p>{text}</p><div className={styles.meta}><time>9:{index === 0 ? '41' : '42'} AM</time><span className={styles.actions}><Icon name="copy" /><Icon name="delete" /></span></div>
            </div>)}
          </div>
          {createElement('cubby-cozy-detailed', { className: styles.bear })}
        </div>
        {tab !== 'clipboard' && <div className={styles.feed} data-demo-feed ref={feed} key={tab}>
          {tab === 'notes' ? <div className={styles.notes}>
            {notes.length === 0 && <div className={styles.empty}>{createElement('cubby-cozy-detailed', { className: styles.emptyBear, accessory: 'pencil', 'aria-hidden': true, inert: true })}<p>Write a note to save it here.</p></div>}
            {notes.map((note, index) => <Fragment key={note.id}>
              {note.day !== notes[index - 1]?.day && <Day label={note.day} />}
              <div className={`${styles.note} ${note.id === latestNote ? styles.arrival : ''} ${editing[note.id] !== undefined ? styles.editingNote : ''} ${selected.includes(note.id) ? styles.selectedNote : ''} ${deleting.includes(note.id) ? styles.deleting : ''}`}
                data-entry-id={note.id} onMouseDown={event => {
                  if (event.button !== 0 || (event.target as HTMLElement).closest('button, textarea')) return;
                  if (event.shiftKey || event.metaKey || event.ctrlKey) {
                    event.preventDefault();
                    window.getSelection()?.removeAllRanges();
                    event.currentTarget.closest<HTMLElement>('[role="tabpanel"]')?.focus({ preventScroll: true });
                  }
                  select(note.id, event);
                }}
                data-divider={note.day === notes[index + 1]?.day}>
                {editing[note.id] !== undefined ? <>
                  <NoteEditor text={editing[note.id]} onChange={text => setEditing(previous => ({ ...previous, [note.id]: text }))} />
                  <div className={styles.meta}><time>{note.time}</time><span className={styles.editControls}>
                    <button type="button" onClick={() => finishEditing(note.id, false)}>Cancel</button>
                    <button type="button" onClick={() => finishEditing(note.id, true)}>Save</button>
                  </span></div>
                </> : <>
                  <p>{note.text}</p>
                  <Actions time={note.time} label="note" copy={() => navigator.clipboard.writeText(note.text)}
                    edit={() => setEditing(previous => ({ ...previous, [note.id]: note.text }))}
                    selectedCount={selected.includes(note.id) ? selected.length : 1}
                    remove={() => remove(deletionTargets(note.id, selected), 'notes')} />
                </>}
              </div>
            </Fragment>)}
          </div> : <div className={styles.screenshots}>
            {screenshots.length === 0 && <div className={`${styles.empty} ${styles.emptyScreenshots}`}>{createElement('cubby-cozy-detailed', { className: styles.emptyBear, accessory: 'camera', 'aria-hidden': true, inert: true })}<p>Screenshots are saved here automatically.</p></div>}
            {screenshots.map((shot, index) => <Fragment key={shot.id}>
              {shot.day !== screenshots[index - 1]?.day && <Day label={shot.day} />}
              <div className={`${styles.screenshot} ${selected.includes(shot.id) ? styles.selectedShot : ''} ${deleting.includes(shot.id) ? styles.deleting : ''}`} data-entry-id={shot.id}>
                <button type="button" className={styles.capture} aria-label={`Select ${shot.label}`} aria-pressed={selected.includes(shot.id)}
                  style={{ backgroundImage: `url('${shot.src}')` }} onClick={event => { select(shot.id, event); event.currentTarget.closest<HTMLElement>('[role="tabpanel"]')?.focus({ preventScroll: true }); }} />
                <div onClick={event => select(shot.id, event)}>
                  <Actions time={shot.time} label="screenshot" copy={() => copyScreenshot(shot.src)} selectedCount={selected.includes(shot.id) ? selected.length : 1} remove={() => remove(deletionTargets(shot.id, selected), 'screenshots')} />
                </div>
              </div>
            </Fragment>)}
          </div>}
        </div>}
        {tab === 'notes' && <form className={styles.composer} data-focused={composerFocused} onSubmit={event => { event.preventDefault(); submit(); }}>
          <textarea ref={editor} value={draft} placeholder="Add a note..." aria-label="Add a note" rows={1}
            onChange={event => setDraft(event.target.value)} onFocus={() => { setSelected([]); setComposerFocused(true); }} onBlur={() => setComposerFocused(false)}
            onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); submit(); } }} />
          <button type="submit" aria-label="Add note" disabled={!draft.trim()}><Icon name="submit" /></button>
        </form>}
      </div>
      <span className={styles.srOnly} role="status">{announcement}</span>
    </div>
  </div>;
}
