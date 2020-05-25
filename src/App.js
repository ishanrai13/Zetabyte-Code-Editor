import React, { Component } from 'react';
import './App.css';
import FileTree from './utilities/FileTree';
var remote = window.require('electron').remote;
var { dialog } = remote;
var fs = window.require('fs');

class App extends Component { 
  constructor(props){
    super(props);

    this.state = {
      fileTree: null,
      fileContent: null
    }
  }
  
  render() {
    var filetree = this.state.fileTree
      ? this.state.fileTree.renderUnorderedList()
      : null;

    return (
      <div className="root" >
        <div className="titleBar">
          <button onClick={this.handleOpenFolder}>Open Folder</button>
          <button onClick={this.handleOpenFile}>Open File</button>
          <button onClick={this.handleSaveFile}>Save File</button>
        </div>
        <div className="codingBody">
          <div id="filetree">
            <p className='fileTreeHeading'>EXPLORER</p>
            {filetree}
          </div>
          <div className="vl"></div>
          {!this.state.fileContent && <textarea className="workspace"></textarea>}
          {/* {this.state.fileContent && <div id="fileContent">
            {this.state.fileContent}
          </div>} */}
          {this.state.fileContent && <textarea className="workspace" defaultValue={this.state.fileContent}></textarea>}
        </div>
        
      </div>
    );
  }

  handleOpenFolder = () => {
    dialog.showOpenDialog({ properties: ['openDirectory']}).then(directory => {
      if (directory.filePaths) {
        var fileTree = new FileTree(directory.filePaths[0]);
  
        fileTree.build();
  
        this.setState({fileTree});
      }
    }).catch(
      console.log('error opening file')
    )
  }
  handleOpenFile = () => {
    dialog.showOpenDialog({ properties: ['openFile']}).then(file => {
      if (file.filePaths) {
        const fileContent = fs.readFileSync(file.filePaths[0]).toString();
        this.setState({fileContent});
      }
    }).catch(
      console.log('error opening file')
    )
  }
  handleSaveFile = () => {
    var options = {
      title: "Save file",
      defaultPath : "my_filename",
      buttonLabel : "Save",

      filters :[
        {name: 'txt', extensions: ['txt',]},
        {name: 'All Files', extensions: ['*']}
       ]
    }
    dialog.showSaveDialog( (filename) => {
      fs.writeFileSync(filename, this.state.fileContent, 'utf-8');
    })
  }
}

export default App;