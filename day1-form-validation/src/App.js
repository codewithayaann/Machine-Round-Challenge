import './App.css';
import { FORM } from './components/constants';
import { Forms } from './components/Forms';
import { validationSchema } from './components/validate';

function App() {
  return (
    <div className="App">
      <Forms forms={FORM} schema={validationSchema} validateOn="" />
      <Forms forms={FORM} schema={validationSchema} validateOn="change" />
      <Forms forms={FORM} schema={validationSchema} validateOn="blur" />
    </div>
  );
}

export default App;
