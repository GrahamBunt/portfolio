// Purpose-written examples. No data from the native app or browser storage.
export type DemoNote = { id: string; day: string; time: string; text: string };
export type DemoScreenshot = { id: string; day: string; time: string; src: string; label: string };

export const sampleNotes: DemoNote[] = [
  { id: 'note-1', day: 'Yesterday', time: '3:24 pm', text: 'Weekend idea: an early walk, a thermos of coffee, and nowhere to be until noon.' },
  { id: 'note-2', day: 'Yesterday', time: '4:08 pm', text: 'For the field guide: warm paper, forest green, and a little room to breathe.' },
  { id: 'note-3', day: 'Today', time: '9:16 am', text: 'Make the useful things easy to reach. Let everything else stay quiet.' },
  { id: 'note-4', day: 'Today', time: '10:42 am', text: 'Prompt context: a small trail journal for remembering places, weather, and the things you notice along the way.' },
];

export const sampleScreenshots: DemoScreenshot[] = [
  { id: 'shot-1', day: 'Yesterday', time: '2:36 pm', src: '/work/cubby/demo/field-guide.png', label: 'Field guide typography and color study' },
  { id: 'shot-2', day: 'Today', time: '9:28 am', src: '/work/cubby/demo/trail-journal.png', label: 'Trail journal interface study' },
  { id: 'shot-3', day: 'Today', time: '11:04 am', src: '/work/cubby/demo/weekend-plan.png', label: 'A quiet weekend itinerary' },
];
