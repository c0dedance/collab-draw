export function setRootVariable(name: string, value: string) {
  document.documentElement.style.setProperty(`--${name}`, value);
}