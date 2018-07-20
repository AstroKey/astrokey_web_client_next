
export default {
  collection: [
    {
      _id: 'abcdefabcdef123123',
      label: 'My New Workflow',
      author: 'aeksco',
      created_by: 'created_by_user_id',
      public: true, // PUBLICLY VISIBLE BOOLEAN
      steps: [
        { id: 2, order: 2, icon: 'fa-play-circle-o', type: 'MACRO', label: 'Run Macro', value: [] },
        { id: 3, order: 3, type: 'KEY_UP', label: 'Release Key' },
        { id: 4, order: 4, icon: 'fa-clock-o', type: 'DELAY', label: 'Delay', value: 2 },
        { id: 5, order: 5, icon: 'fa-paragraph', type: 'TEXT', label: 'Type', value: 'Hello, AstroKey!' }
        // { id: 6, order: 6, icon: 'fa-cube', type: 'KEY', value: 'ENTER' }
      ]
    }
  ],
  new_model: {},
  current: {},
  selectedStep: null,
  recording: false,
  fetching: false
}
