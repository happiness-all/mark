// js乘法bug修复
export const accMul = (arg1, arg2) => {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) {}
  try { m += s2.split(".")[1].length } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
// js加法bug修复
export const accAdd = (arg1, arg2) => {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  //动态控制精度长度 
  n = (r1 >= r2) ? r1 : r2;
  return ((accMul(arg1, m) + accMul(arg2, m)) / m).toFixed(n);
}
// js减法bug修复
export const accSub = (arg1, arg2) => {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度 
  n = (r1 >= r2) ? r1 : r2;
  return ((accMul(arg1, m) - accMul(arg2, m)) / m).toFixed(n);
}
