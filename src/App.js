import React, { useState, useEffect } from 'react';
import './App.css';
import wiki from './wiki';
import PersonImage from './PersonImage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import ErrorBoundary from './ErrorBoundary';

const listName = 'List_of_female_explorers_and_travelers';

const initialIndex = clamp(
  Number(window.localStorage.getItem('explorerIndex' || 0)) + 1,
  0,
  72
);

function clamp(val, min, max) {
  if (val > max) return 0;

  if (val < min) return 72;

  return val;
}

function App() {
  const [explorers, setExplorers] = useState([]);
  const [explorerIndex, setExplorerIndex] = useState(initialIndex);

  useEffect(() => {
    window.localStorage.setItem('explorerIndex', explorerIndex);
  }, [explorerIndex]);

  useEffect(() => {
    const explorersList = localStorage.getItem(listName);

    if (explorersList) return setExplorers(JSON.parse(explorersList));

    wiki
      .page(listName)
      .then(page => page.tables())
      .then(tables => {
        window.localStorage.setItem(listName, JSON.stringify(tables[0]));
        setExplorers(tables[0]);
      })
      .catch(err => {
        console.log('explorer', err);

      });
  }, []);

  if (!explorers.length) return <p>loading...</p>;

  const explorer = explorers[explorerIndex];

  const buttonStyle = { margin: 10}
  return (
    <div className="App">
      <Paper
        style={{
          padding: 15,
          width: 600,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 540,
          position: 'relative',
        }}
      >
        <Typography variant="h4">
          <Link
            href={`https://en.wikipedia.org/wiki/${explorer.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {explorer.name}
          </Link>
        </Typography>
        <Typography variant="caption">
          {explorer.born} - {explorer.died || 'Present'}
        </Typography>
        <Typography variant="caption">{explorer.nationality}</Typography>
        <ErrorBoundary>
        <PersonImage name={explorer.name} />
        </ErrorBoundary>
        <Typography style={{ padding: '30px 0 15px 0'}} variant="body1">{explorer['achievement/s']}</Typography>
        <div style={{ position: 'absolute', bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <Button
            color="primary"
            style={buttonStyle}
            onClick={() => setExplorerIndex(clamp(explorerIndex - 1, 0, 72))}
          >
            Back
          </Button>
          <Button
            color="primary"
            style={buttonStyle}
            onClick={() => setExplorerIndex(clamp(explorerIndex + 1, 0, 72))}
          >
            Next
          </Button>
        </div>
      </Paper>
    </div>
  );
}

export default App;
