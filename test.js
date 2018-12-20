let a = {};
a.name = '123';
a.age = 2;

for(let v of Object.keys(a)){
  console.log(v);
}