import { Button, Input, Label } from '../';
import './App.css';

function App() {
  return (
    <div>
      <Label>hello</Label>

      <Button
        onClick={() => {
          console.log('hi');
        }}
      />

      <Input />
    </div>
  );
}

export default App;
