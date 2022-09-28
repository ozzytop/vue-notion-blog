export function convertColor(color) {
    switch (color) {
        case "red":
            return '#ffe2dd'
        case "orange":
            return '#fadec9'
        case "green":
            return '#dbeddb';
        case "purple":
            return '#e8deee';
        case "default":
            return '#e3e2e080';            
        case "brown":
            return '#eee0da';
        case "blue":
            return '#d3e5ef';
        case "pink":
            return '#f5e0e9';
        case "yellow":
            return '#fdecc8';
        case "gray":
            return '#e3e2e0';
        default:
            return '#e3e2e080';
    }
}

export function parseRichContent(content) {
    let contentParsed = content.map((item) => {

        let content = item.plain_text.replace(/\n/g, "<br />");

        const { bold, italic, color, underline, code } = item.annotations;
        
        if (italic) {
            content = `<i>'${content}</i>`;
          }
      
          if (bold) {
            content = `<strong>${content}</strong>`;
          }
      
          if (underline) {
            content = `<u>${content}</u>`;
          }
      
          /*
          if (text.href) {
            content = <a href={text.href} className={color == 'default' ? "blue" : color}>{content}</a>;
            return content;
          }
          */
        
          if (color && !code) {
            content = `<span class="${color}">${content}</span>`;
          }
      
          if (code) {
            content = `<code>${content}</code>`;
          }
      
          return content;
        
    })
    
    return contentParsed
}