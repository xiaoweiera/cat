/**
 * @file 初始化
 * @author svon.me@gmail.com
 */


function append(src: string) {
  const script = document.createElement('script');
  script.src = src;
  script.setAttribute('data-namespace', src);
  const body: any = document.querySelector('head');
  if (body) {
    body.appendChild(script);
  }
}

export const iconFont = function(list: string[]) {
  list.forEach(value => append(value))
}
