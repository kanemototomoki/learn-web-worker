self.onmessage = (e) => {
  self.postMessage(e.data.name ? `Hello ${e.data.name}!` : '');
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
