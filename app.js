// Purpose: Define the Flow editor form using native Directus input interfaces, without a browser bundle.
export default {
  id: 'gbesse-jev-decision', name: 'Jev decision', icon: 'alt_route',
  description: 'Evaluate a versioned rule and return a typed decision record.',
  overview: ({ timeoutMs }) => [{ label: 'Timeout (ms)', text: String(timeoutMs || 30000) }],
  options: [
    { field: 'pack', name: 'DecisionPack', type: 'json', meta: { interface: 'input-code', options: { language: 'json' }, width: 'full', required: true } },
    { field: 'state', name: 'State', type: 'json', meta: { interface: 'input-code', options: { language: 'json' }, width: 'full', required: true } },
    { field: 'timeoutMs', name: 'Timeout (ms)', type: 'integer', schema: { default_value: 30000 }, meta: { interface: 'input', width: 'half' } },
  ],
};
