import "isomorphic-fetch"

export function getApps() {
  return fetch(process.env.NODE_ENV === 'development' ? './src/rcm-micro-app-paths.json' : '/api/v1/rcm-container-config')
    .then(response => response.json())
    .then(data => {
      let results = [];
      let turnOnReact = true;

      if (turnOnReact) {
        results.push({
          root: data.reactAppPath,
          routes: [
            { hashPattern: '^#\\/my-app-1' }
          ]
        })
      } else {
        results.push({
          root: data.angularJsAppPath,
          routes: [
            { hashPattern: '^#\\/my-app-1' }
          ]
        })
      }

      return { results };

    });
}
