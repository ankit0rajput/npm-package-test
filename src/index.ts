import app from './app';
import {testFun} from './libraries/aes.algo.library'

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

