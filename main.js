const electron = require('electron')
const fs = require('fs');

// Module to control application life.


const app = electron.app;
const Tray = electron.Tray;
const Menu = electron.Menu;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const exec = require('child_process').exec;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function getUserHome() {
  return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

/* todo unlock file
if (fs.existsSync(getUserHome()+"/.ipfs/repo.lock")) {
	fs.closeSync(getUserHome()+"/.ipfs/repo.lock");
	fs.unlink(getUserHome()+"/.ipfs/repo.lock");
} */

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()
	mainWindow.on('minimize',function(event){
        event.preventDefault()
            mainWindow.hide();
    });
  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
	
	if (a) a.kill();
	if (b) b.kill();
	exec("TaskKill /F /IM ipfs.exe");
	
    mainWindow = null
  })
  
  var contextMenu = Menu.buildFromTemplate([

        { label: 'Show App', click:  function(){
            mainWindow.show();
        } },
        { label: 'Quit', click:  function(){
            application.isQuiting = true;
            application.quit();

        } }
    ]);
var appIcon = null;
    appIcon = new Tray('./img/star_rating.png');

    appIcon.setToolTip('Electron.js App');
    appIcon.setContextMenu(contextMenu);
	
	
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

var IPFS = require('ipfs');

var express = require("express");
var multer  = require('multer');
var cors = require('cors');

var node;

var ipfsAPI = require('ipfs-api')

//install ipfs

if (!fs.existsSync("./go-ipfs")) {
   var a = exec('node src/bin.js', (err, stdout, stderr) => {
	console.log("intalation ipfs",stdout);
	 console.log("err",err);
		var a = exec('go-ipfs\\ipfs.exe init', (err, stdout, stderr) => {
		 console.log(err);
			 var b = exec('go-ipfs\\ipfs.exe daemon', (err, stdout, stderr) => {
			 console.log(err);
			});
		});
	});
} else {
	
	var b = exec('go-ipfs\\ipfs.exe daemon', (err, stdout, stderr) => {
		 console.log(err);
		});
}

// connect to ipfs daemon API server
var ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

var node = new IPFS();



//TODO run before upload





 console.log("try to run uploadserver");
 
    var app2 = express();
    app2.use(cors());
    app2.options('*', cors());
    var form = "<!DOCTYPE HTML><html><body>" +
    "<form method='post' action='/upload' enctype='multipart/form-data'>" +
    "<input type='file' name='image'/>" +
    "<input type='submit' /></form>" +
    "</body></html>";
    
    app2.get('/s', function (req, res){
      res.writeHead(200, {'Content-Type': 'text/html' });
      res.end(form);
    });
    
    
    var upload = multer({
      dest: path.join(__dirname, './upload/temp')
    });
    
    // Post files
    app2.get('/upload',function(req,res){
      res.writeHead(200, {
                  'Content-Type': 'text/html',
                  'Access-Control-Allow-Origin' : '*'
                  });
      res.end('try POST');
    }) ;
    
    app2.post('/upload', upload.any(), function(req, res) {
       
	   
	   ipfs.util.addFromFs(req.files[0].path, { recursive: true }, (err, result) => {
		  if (err) {
			throw err
		  }
		  res.writeHead(200, {
                  'Content-Type': 'text/html',
                  'Access-Control-Allow-Origin' : '*'
                  });
          res.end('https://ipfs.io/ipfs/'+result[0].hash);
		});
        
		
    });
    app2.listen(8081);
    
  