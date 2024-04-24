import app from './app';
import {testFun} from './libraries/aes.algo.library'
const asd = testFun(1,2)
console.log(asd)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

