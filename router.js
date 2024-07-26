const routes = {
  '/' : {
    linkLabel: 'Accueil',
    url: '/index.html'
  },
  '/aria': {
    linkLabel: 'Aria',
    game: 'aria',
    url: '/pages/aria.html'
  },
  '/poudlard': {
    linkLabel: 'Poudlard',
    game: 'hogwards',
    url: '/pages/poudlard.html'
  },
  '/pathfinder': {
    linkLabel: 'Pathfinder',
    game: 'pathfinder',
    url: '/pages/pathfinder.html'
  }
}

const homeRoutes = {
  '/aria': {
    linkLabel: 'Aria',
    game: 'aria',
    url: '/pages/aria.html'
  },
  '/poudlard': {
    linkLabel: 'Poudlard',
    game: 'hogwards',
    url: '/pages/poudlard.html'
  },
  '/pathfinder': {
    linkLabel: 'Pathfinder',
    game: 'pathfinder',
    url: '/pages/pathfinder.html'
  }
}

// Ajout des routes sur la page d'accueil
const app = document.getElementById('app');
const nav = document.getElementById('nav');

const navLinks = () => {
  const navItem = document.createDocumentFragment();
  Object.keys(routes).forEach(route => {
    const {linkLabel} = routes[route];
    const game = routes[route]["game"];

    const linkElement = document.createElement('a');
    linkElement.href = route;
    linkElement.className = 'nav-link';
    navItem.appendChild(linkElement);

    const linkTitle = document.createElement('h2');
    linkTitle.textContent = linkLabel;
    linkTitle.className = game + "-icon card"
    linkElement.append(linkTitle);
  });

  nav.append(navItem);
}

const homeLinks = () => {
  const navItem = document.createDocumentFragment();
  Object.keys(homeRoutes).forEach(route => {
    const {linkLabel} = routes[route];
    const game = routes[route]["game"];

    const linkElement = document.createElement('a');
    linkElement.href = route;
    linkElement.className = 'link-card';
    navItem.appendChild(linkElement);

    const linkTitle = document.createElement('h2');
    linkTitle.textContent = linkLabel;
    linkTitle.className = game + "-icon card"
    linkElement.append(linkTitle);
  });

  nav.append(navItem);
}

homeLinks();