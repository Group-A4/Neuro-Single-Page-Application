

class MarkdownParser {

    azureAccountName = 'your_account_name';
    azureContainerName = 'your_container_name';
    contentEntities : String[] = [];
    contentMap = new Map<String, { format: string, parser: (args : string[]) => string }>();

    constructor(azureAccountName : string, azureContainerName : string, contentEntities : string[]) {
        this.azureAccountName = azureAccountName;
        this.azureContainerName = azureContainerName;
        this.contentEntities = contentEntities;

        this.contentMap.set('!image', { format: this.imageFormatString, parser: this.parseThree });
        this.contentMap.set('!video', { format: this.videoFormatString, parser: this.parseTwo });
        this.contentMap.set('!pdf', { format: this.pdfFormatString, parser: this.parseTwo });
        this.contentMap.set('!ppt', { format: this.pptFormatString, parser: this.parseTwo });
        this.contentMap.set('!audio', { format: this.audioFormatString, parser: this.parseTwo });
        this.contentMap.set('!link', { format: this.linkFormatString, parser: this.parseThree });
        this.contentMap.set('!ytvideo', { format: this.ytVideoFormatString, parser: this.parseThree });
    }


    AZURE_STORAGE_URL = 'https://{1}.blob.core.windows.net/{2}/{3}';

    imageFormatString = '\n <img src="{1}" alt="{2}" /> \n';
    videoFormatString =
    '\n <video width="320" height="240" controls>\n' +
    '   <source src="{1}" type="video/mp4">\n' +
    '   Your browser does not support the video tag.\n' +
    ' </video> \n';
    pdfFormatString =
    '\n <iframe src="{1}" width="100%%" height="600px">\n' +
    '   <p>Your browser does not support iframes.</p>\n' +
    ' </iframe> \n';
    pptFormatString =
    '\n <iframe src="https://view.officeapps.live.com/op/embed.aspx?src={1}" frameborder="0" style="width: 100%; height: 600px;">\n' +
    '   <p>Your browser does not support iframes.</p>\n' +
    ' </iframe> \n';
    audioFormatString =
    '\n <audio controls>\n' +
    '   <source src="{1}" type="audio/mpeg">\n' +
    '   Your browser does not support the audio element.\n' +
    ' </audio> \n';
    linkFormatString = '\n <a href="{1}">{2}</a>';
    ytVideoFormatString =
    '\n <iframe width="1026" height="577" src="https://www.youtube.com/embed/{1}" title="{2}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> \n';

    linkPattern = /^https?:\/\/(www.)?\w+(.\w+)+(\/.+)*$/;

    parseTwo = (args : string[]) => {
        const [format, arg1] = args;

        return format.replace('{1}', arg1);
        
    };
    
    parseThree = (args : string[]) => {
        const [format, arg1, arg2] = args;

        return format.replace('{1}', arg1).replace('{2}', arg2);
    };
    



    exists = (name : String) => {
    for (let i = 0; i < this.contentEntities.length; i++) {
      if (this.contentEntities[i] === name) {
        return true;
      }
    }
    return false;
  };

  parse = (markdownText: string): string => {
    markdownText = markdownText.replace(/!ytvideo:\s*https:\/\/www\.youtube\.com\/watch\?v=/g, "!ytvideo:");

    const tags = Array.from(this.contentMap.keys());
    for (const tag of tags) {
      const pattern = new RegExp(`${tag}:(.+)`, 'g');
      let matcher;
      while ((matcher = pattern.exec(markdownText)) !== null) {  
        const fileName = matcher[1].trim();
  
        const linkMatcher = this.linkPattern.exec(fileName);

        if (linkMatcher !== null) {
            const mapline = this.contentMap.get(tag);
            const parser = mapline?.parser;
            if(mapline === undefined || parser === undefined){
                continue;
            }

            markdownText = markdownText.replace(`${tag}:${fileName}`, parser([mapline.format, fileName, fileName]));
            continue;
        }
  
        if (!this.exists(fileName) && tag !== '!ytvideo') {
            continue;
        }
  
        let fileUrl = this.AZURE_STORAGE_URL.replace('{1}', this.azureAccountName).replace('{2}', this.azureContainerName).replace('{3}', fileName);
        if(tag === '!ytvideo'){
            fileUrl = fileName;
        }

        const mapline = this.contentMap.get(tag);
        const parser = mapline?.parser;
        if(mapline === undefined || parser === undefined){
            continue;
        }
        const args = [mapline.format, fileUrl, fileName]
        markdownText = markdownText.replace(`${tag}:${fileName}`, parser(args));
      }
    }
  
    return markdownText;
  }
  
};


export default MarkdownParser;