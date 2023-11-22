export async function load_html() {
  return Promise.all([
    fetch("header.html").then((response) => response.text()),
    fetch("footer.html").then((response) => response.text()),
  ]).then(([headerHtml, footerHtml]) => {
    document.getElementById("header").innerHTML = headerHtml;
    document.getElementById("footer").innerHTML = footerHtml;
  });
}

export async function load_html_links_header() {
  return Promise.all([
    fetch("header_links.html").then((response) => response.text()),
    fetch("footer.html").then((response) => response.text()),
  ]).then(([headerHtml, footerHtml]) => {
    document.getElementById("header").innerHTML = headerHtml;
    document.getElementById("footer").innerHTML = footerHtml;
  });
}
