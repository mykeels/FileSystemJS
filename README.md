# FileSystem JS

This is a JavaScript wrapper that provides a promise interface for working with the Chrome Browser FileSystem API. It is built with the aim of making it very easy to use. Hence, promises, rather than the default callbacks that the Native Implementations use.

## Available Methods

- Request Permission

    You can request permission to use the File System on your Web Application with

```javascript
FileSystem.request()
            .then(function (fs) {
                console.log(fs) //[fs] is a FileSystem object
            })
            .catch(function (err) { 
                console.error(err)
            })
```

- Create New File

    You can create a new file in the file system allocated to your application

```javascript
FileSystem.createFile("log.txt")
            .then(function (fileEntry) { 
                console.log(fileEntry) //manipulate the new file
            })
            .catch(function (err) { 
                console.error(err) 
            })
```

- Read File

    You can read a file already existing in the file system allocated to your application

```javascript
FileSystem.readFile("log.txt")
            .then(function (fileEntry) { 
                console.log(fileEntry) //do stuff with the fileEntry
            })
            .catch(function (err) { 
                console.error(err) 
            })
```

- Read File as Text

    You can read text from a file already existing in the file system allocated to your application

```javascript
FileSystem.readFileText("log.txt")
            .then(function (textContent) { 
                console.log(textContent) //do stuff with the textContent
            })
            .catch(function (err) { 
                console.error(err) 
            })
```

- Write Stuff to a File

    You can read text from a file already existing in the file system allocated to your application

```javascript
FileSystem.writeFile("log.txt", new Blob(["Hello World"], { type: "text/plain" }))
            .then(function (fileEntry) { 
                console.log(fileEntry) //do stuff with the fileEntry
            })
            .catch(function (err) { 
                console.error(err) 
            })
```

## Contributions

This was built to aid in a quick pet project, so there are a lot more methods people might need that are not available. Quick examples from the top of my head are:

- Rename File
- Delete File
- Move File
- Copy and Paste File
- All other stuff with Directories

Make a pull request if you can, request for enhancements and raise [issues here](https://github.com/mykeels/FileSystemJS/issues).

## License

This project is licensed under the [MIT License](LICENSE).