(function() {
    var c, b, k, h, e, n, l, m = [].slice, g = {}.hasOwnProperty, p = function(b, d) {
        function c() {
            this.constructor = b
        }
        for (var e in d)
            g.call(d, e) && (b[e] = d[e]);
        c.prototype = d.prototype;
        b.prototype = new c;
        b.__super__ = d.prototype;
        return b
    };
    n = function() {}
    ;
    b = function() {
        function b() {}
        b.prototype.addEventListener = b.prototype.on;
        b.prototype.on = function(d, b) {
            this._callbacks = this._callbacks || {};
            this._callbacks[d] || (this._callbacks[d] = []);
            this._callbacks[d].push(b);
            return this
        }
        ;
        b.prototype.emit = function() {
            var d, b, g, f, c;
            b = arguments[0];
            d = 2 <= arguments.length ? m.call(arguments, 1) : [];
            this._callbacks = this._callbacks || {};
            if (g = this._callbacks[b])
                for (f = 0,
                c = g.length; f < c; f++)
                    b = g[f],
                    b.apply(this, d);
            return this
        }
        ;
        b.prototype.removeListener = b.prototype.off;
        b.prototype.removeAllListeners = b.prototype.off;
        b.prototype.removeEventListener = b.prototype.off;
        b.prototype.off = function(d, b) {
            var g, f, c, y, e;
            if (!this._callbacks || 0 === arguments.length)
                return this._callbacks = {},
                this;
            f = this._callbacks[d];
            if (!f)
                return this;
            if (1 === arguments.length)
                return delete this._callbacks[d],
                this;
            c = y = 0;
            for (e = f.length; y < e; c = ++y)
                if (g = f[c],
                g === b) {
                    f.splice(c, 1);
                    break
                }
            return this
        }
        ;
        return b
    }();
    c = function(g) {
        function d(b, g) {
            var f, e, p;
            this.element = b;
            this.version = d.version;
            this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, "");
            this.clickableElements = [];
            this.listeners = [];
            this.files = [];
            "string" === typeof this.element && (this.element = document.querySelector(this.element));
            // if (!this.element || null == this.element.nodeType)
            //     throw Error("Invalid dropzone element.");
            // if (this.element.dropzone)
            //     throw Error("Dropzone already attached.");
            d.instances.push(this);
            this.element.dropzone = this;
            f = null != (p = d.optionsForElement(this.element)) ? p : {};
            this.options = c({}, this.defaultOptions, f, null != g ? g : {});
            if (this.options.forceFallback || !d.isBrowserSupported())
                return this.options.fallback.call(this);
            null == this.options.url && (this.options.url = this.element.getAttribute("action"));
            if (!this.options.url)
                throw Error("No URL provided.");
            if (this.options.acceptedFiles && this.options.acceptedMimeTypes)
                throw Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
            this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes,
            delete this.options.acceptedMimeTypes);
            this.options.method = this.options.method.toUpperCase();
            (e = this.getExistingFallback()) && e.parentNode && e.parentNode.removeChild(e);
            !1 !== this.options.previewsContainer && (this.previewsContainer = this.options.previewsContainer ? d.getElement(this.options.previewsContainer, "previewsContainer") : this.element);
            this.options.clickable && (this.clickableElements = !0 === this.options.clickable ? [this.element] : d.getElements(this.options.clickable, "clickable"));
            this.init()
        }
        var c, k;
        p(d, g);
        d.prototype.Emitter = b;
        d.prototype.events = "drop dragstart dragend dragenter dragover dragleave addedfile addedfiles removedfile thumbnail error errormultiple processing processingmultiple uploadprogress totaluploadprogress sending sendingmultiple success successmultiple canceled canceledmultiple complete completemultiple reset maxfilesexceeded maxfilesreached queuecomplete".split(" ");
        d.prototype.defaultOptions = {
            url: null ,
            method: "post",
            withCredentials: !1,
            parallelUploads: 2,
            uploadMultiple: !1,
            maxFilesize: 256,
            paramName: "file",
            createImageThumbnails: !0,
            maxThumbnailFilesize: 10,
            thumbnailWidth: 120,
            thumbnailHeight: 120,
            filesizeBase: 1E3,
            maxFiles: null ,
            params: {},
            clickable: !0,
            ignoreHiddenFiles: !0,
            acceptedFiles: null ,
            acceptedMimeTypes: null ,
            autoProcessQueue: !0,
            autoQueue: !0,
            addRemoveLinks: !1,
            previewsContainer: null ,
            hiddenInputContainer: "body",
            capture: null ,
            renameFilename: null ,
            dictDefaultMessage: "Drop files here to upload",
            dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
            dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
            dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
            dictInvalidFileType: "You can't upload files of this type.",
            dictResponseError: "Server responded with {{statusCode}} code.",
            dictCancelUpload: "Cancel upload",
            dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
            dictRemoveFile: "Remove file",
            dictRemoveFileConfirmation: null ,
            dictMaxFilesExceeded: "You can not upload any more files.",
            accept: function(d, b) {
                return b()
            },
            init: function() {
                return n
            },
            forceFallback: !1,
            fallback: function() {
                var b, g, f, c, e;
                this.element.className = "" + this.element.className + " dz-browser-not-supported";
                e = this.element.getElementsByTagName("div");
                f = 0;
                for (c = e.length; f < c; f++)
                    b = e[f],
                    /(^| )dz-message($| )/.test(b.className) && (g = b,
                    b.className = "dz-message");
                g || (g = d.createElement('<div class="dz-message"><span></span></div>'),
                this.element.appendChild(g));
                if (b = g.getElementsByTagName("span")[0])
                    null != b.textContent ? b.textContent = this.options.dictFallbackMessage : null != b.innerText && (b.innerText = this.options.dictFallbackMessage);
                return this.element.appendChild(this.getFallbackForm())
            },
            resize: function(d) {
                var b, g, f;
                b = {
                    srcX: 0,
                    srcY: 0,
                    srcWidth: d.width,
                    srcHeight: d.height
                };
                g = d.width / d.height;
                b.optWidth = this.options.thumbnailWidth;
                b.optHeight = this.options.thumbnailHeight;
                null == b.optWidth && null == b.optHeight ? (b.optWidth = b.srcWidth,
                b.optHeight = b.srcHeight) : null == b.optWidth ? b.optWidth = g * b.optHeight : null == b.optHeight && (b.optHeight = 1 / g * b.optWidth);
                f = b.optWidth / b.optHeight;
                d.height < b.optHeight || d.width < b.optWidth ? (b.trgHeight = b.srcHeight,
                b.trgWidth = b.srcWidth) : g > f ? (b.srcHeight = d.height,
                b.srcWidth = b.srcHeight * f) : (b.srcWidth = d.width,
                b.srcHeight = b.srcWidth / f);
                b.srcX = (d.width - b.srcWidth) / 2;
                b.srcY = (d.height - b.srcHeight) / 2;
                return b
            },
            drop: function(d) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragstart: n,
            dragend: function(d) {
                return this.element.classList.remove("dz-drag-hover")
            },
            dragenter: function(d) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragover: function(d) {
                return this.element.classList.add("dz-drag-hover")
            },
            dragleave: function(d) {
                return this.element.classList.remove("dz-drag-hover")
            },
            paste: n,
            reset: function() {
                return this.element.classList.remove("dz-started")
            },
            addedfile: function(b) {
                var g, f, c, e, p, l;
                this.element === this.previewsContainer && this.element.classList.add("dz-started");
                if (this.previewsContainer) {
                    b.previewElement = d.createElement(this.options.previewTemplate.trim());
                    b.previewTemplate = b.previewElement;
                    this.previewsContainer.appendChild(b.previewElement);
                    e = b.previewElement.querySelectorAll("[data-dz-name]");
                    f = 0;
                    for (c = e.length; f < c; f++)
                        g = e[f],
                        g.textContent = this._renameFilename(b.name);
                    e = b.previewElement.querySelectorAll("[data-dz-size]");
                    f = 0;
                    for (c = e.length; f < c; f++)
                        g = e[f],
                        g.innerHTML = this.filesize(b.size);
                    this.options.addRemoveLinks && (b._removeLink = d.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"),
                    b.previewElement.appendChild(b._removeLink));
                    g = function(g) {
                        return function(f) {
                            f.preventDefault();
                            f.stopPropagation();
                            return b.status === d.UPLOADING ? d.confirm(g.options.dictCancelUploadConfirmation, function() {
                                return g.removeFile(b)
                            }) : g.options.dictRemoveFileConfirmation ? d.confirm(g.options.dictRemoveFileConfirmation, function() {
                                return g.removeFile(b)
                            }) : g.removeFile(b)
                        }
                    }(this);
                    p = b.previewElement.querySelectorAll("[data-dz-remove]");
                    l = [];
                    c = 0;
                    for (e = p.length; c < e; c++)
                        f = p[c],
                        l.push(f.addEventListener("click", g));
                    return l
                }
            },
            removedfile: function(d) {
                var b;
                d.previewElement && null != (b = d.previewElement) && b.parentNode.removeChild(d.previewElement);
                return this._updateMaxFilesReachedClass()
            },
            thumbnail: function(d, b) {
                var g, f, c, e;
                if (d.previewElement) {
                    d.previewElement.classList.remove("dz-file-preview");
                    e = d.previewElement.querySelectorAll("[data-dz-thumbnail]");
                    f = 0;
                    for (c = e.length; f < c; f++)
                        g = e[f],
                        g.alt = d.name,
                        g.src = b;
                    return setTimeout(function(b) {
                        return function() {
                            return d.previewElement.classList.add("dz-image-preview")
                        }
                    }(this), 1)
                }
            },
            error: function(d, b) {
                var g, f, c, e, p;
                if (d.previewElement) {
                    d.previewElement.classList.add("dz-error");
                    "String" !== typeof b && b.error && (b = b.error);
                    e = d.previewElement.querySelectorAll("[data-dz-errormessage]");
                    p = [];
                    f = 0;
                    for (c = e.length; f < c; f++)
                        g = e[f],
                        p.push(g.textContent = b);
                    return p
                }
            },
            errormultiple: n,
            processing: function(d) {
                if (d.previewElement && (d.previewElement.classList.add("dz-processing"),
                d._removeLink))
                    return d._removeLink.textContent = this.options.dictCancelUpload
            },
            processingmultiple: n,
            uploadprogress: function(d, b, g) {
                var f, c, e;
                if (d.previewElement) {
                    c = d.previewElement.querySelectorAll("[data-dz-uploadprogress]");
                    e = [];
                    g = 0;
                    for (f = c.length; g < f; g++)
                        d = c[g],
                        "PROGRESS" === d.nodeName ? e.push(d.value = b) : e.push(d.style.width = "" + b + "%");
                    return e
                }
            },
            totaluploadprogress: n,
            sending: n,
            sendingmultiple: n,
            success: function(d) {
                if (d.previewElement)
                    return d.previewElement.classList.add("dz-success")
            },
            successmultiple: n,
            canceled: function(d) {
                return this.emit("error", d, "Upload canceled.")
            },
            canceledmultiple: n,
            complete: function(d) {
                d._removeLink && (d._removeLink.textContent = this.options.dictRemoveFile);
                if (d.previewElement)
                    return d.previewElement.classList.add("dz-complete")
            },
            completemultiple: n,
            maxfilesexceeded: n,
            maxfilesreached: n,
            queuecomplete: n,
            addedfiles: n,
            previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
        };
        c = function() {
            var d, b, g, f, c, e, p;
            f = arguments[0];
            g = 2 <= arguments.length ? m.call(arguments, 1) : [];
            e = 0;
            for (p = g.length; e < p; e++)
                for (d in b = g[e],
                b)
                    c = b[d],
                    f[d] = c;
            return f
        }
        ;
        d.prototype.getAcceptedFiles = function() {
            var d, b, g, f, c;
            f = this.files;
            c = [];
            b = 0;
            for (g = f.length; b < g; b++)
                d = f[b],
                d.accepted && c.push(d);
            return c
        }
        ;
        d.prototype.getRejectedFiles = function() {
            var d, b, g, f, c;
            f = this.files;
            c = [];
            b = 0;
            for (g = f.length; b < g; b++)
                d = f[b],
                d.accepted || c.push(d);
            return c
        }
        ;
        d.prototype.getFilesWithStatus = function(d) {
            var b, g, f, c, e;
            c = this.files;
            e = [];
            g = 0;
            for (f = c.length; g < f; g++)
                b = c[g],
                b.status === d && e.push(b);
            return e
        }
        ;
        d.prototype.getQueuedFiles = function() {
            return this.getFilesWithStatus(d.QUEUED)
        }
        ;
        d.prototype.getUploadingFiles = function() {
            return this.getFilesWithStatus(d.UPLOADING)
        }
        ;
        d.prototype.getAddedFiles = function() {
            return this.getFilesWithStatus(d.ADDED)
        }
        ;
        d.prototype.getActiveFiles = function() {
            var b, g, f, c, e;
            c = this.files;
            e = [];
            g = 0;
            for (f = c.length; g < f; g++)
                b = c[g],
                b.status !== d.UPLOADING && b.status !== d.QUEUED || e.push(b);
            return e
        }
        ;
        d.prototype.init = function() {
            var b, g, f, c, e, p;
            "form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data");
            this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(d.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>"));
            this.clickableElements.length && (f = function(d) {
                return function() {
                    d.hiddenFileInput && d.hiddenFileInput.parentNode.removeChild(d.hiddenFileInput);
                    d.hiddenFileInput = document.createElement("input");
                    d.hiddenFileInput.setAttribute("type", "file");
                    (null == d.options.maxFiles || 1 < d.options.maxFiles) && d.hiddenFileInput.setAttribute("multiple", "multiple");
                    d.hiddenFileInput.className = "dz-hidden-input";
                    null != d.options.acceptedFiles && d.hiddenFileInput.setAttribute("accept", d.options.acceptedFiles);
                    null != d.options.capture && d.hiddenFileInput.setAttribute("capture", d.options.capture);
                    d.hiddenFileInput.style.visibility = "hidden";
                    d.hiddenFileInput.style.position = "absolute";
                    d.hiddenFileInput.style.top = "0";
                    d.hiddenFileInput.style.left = "0";
                    d.hiddenFileInput.style.height = "0";
                    d.hiddenFileInput.style.width = "0";
                    document.querySelector(d.options.hiddenInputContainer).appendChild(d.hiddenFileInput);
                    return d.hiddenFileInput.addEventListener("change", function() {
                        var b, g, c, e;
                        g = d.hiddenFileInput.files;
                        if (g.length)
                            for (c = 0,
                            e = g.length; c < e; c++)
                                b = g[c],
                                d.addFile(b);
                        d.emit("addedfiles", g);
                        return f()
                    })
                }
            }(this),
            f());
            this.URL = null != (b = window.URL) ? b : window.webkitURL;
            p = this.events;
            c = 0;
            for (e = p.length; c < e; c++)
                b = p[c],
                this.on(b, this.options[b]);
            this.on("uploadprogress", function(d) {
                return function() {
                    return d.updateTotalUploadProgress()
                }
            }(this));
            this.on("removedfile", function(d) {
                return function() {
                    return d.updateTotalUploadProgress()
                }
            }(this));
            this.on("canceled", function(d) {
                return function(b) {
                    return d.emit("complete", b)
                }
            }(this));
            this.on("complete", function(d) {
                return function(b) {
                    if (0 === d.getAddedFiles().length && 0 === d.getUploadingFiles().length && 0 === d.getQueuedFiles().length)
                        return setTimeout(function() {
                            return d.emit("queuecomplete")
                        }, 0)
                }
            }(this));
            g = function(d) {
                d.stopPropagation();
                return d.preventDefault ? d.preventDefault() : d.returnValue = !1
            }
            ;
            this.listeners = [{
                element: this.element,
                events: {
                    dragstart: function(d) {
                        return function(b) {
                            return d.emit("dragstart", b)
                        }
                    }(this),
                    dragenter: function(d) {
                        return function(b) {
                            g(b);
                            return d.emit("dragenter", b)
                        }
                    }(this),
                    dragover: function(d) {
                        return function(b) {
                            var f;
                            try {
                                f = b.dataTransfer.effectAllowed
                            } catch (c) {}
                            b.dataTransfer.dropEffect = "move" === f || "linkMove" === f ? "move" : "copy";
                            g(b);
                            return d.emit("dragover", b)
                        }
                    }(this),
                    dragleave: function(d) {
                        return function(b) {
                            return d.emit("dragleave", b)
                        }
                    }(this),
                    drop: function(d) {
                        return function(b) {
                            g(b);
                            return d.drop(b)
                        }
                    }(this),
                    dragend: function(d) {
                        return function(b) {
                            return d.emit("dragend", b)
                        }
                    }(this)
                }
            }];
            this.clickableElements.forEach(function(b) {
                return function(g) {
                    return b.listeners.push({
                        element: g,
                        events: {
                            click: function(f) {
                                (g !== b.element || f.target === b.element || d.elementInside(f.target, b.element.querySelector(".dz-message"))) && b.hiddenFileInput.click();
                                return !0
                            }
                        }
                    })
                }
            }(this));
            this.enable();
            return this.options.init.call(this)
        }
        ;
        d.prototype.destroy = function() {
            var b;
            this.disable();
            this.removeAllFiles(!0);
            null != (b = this.hiddenFileInput) && b.parentNode && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),
            this.hiddenFileInput = null );
            delete this.element.dropzone;
            return d.instances.splice(d.instances.indexOf(this), 1)
        }
        ;
        d.prototype.updateTotalUploadProgress = function() {
            var d, b, g, f, c, e;
            b = g = 0;
            if (this.getActiveFiles().length) {
                e = this.getActiveFiles();
                f = 0;
                for (c = e.length; f < c; f++)
                    d = e[f],
                    g += d.upload.bytesSent,
                    b += d.upload.total;
                d = 100 * g / b
            } else
                d = 100;
            return this.emit("totaluploadprogress", d, b, g)
        }
        ;
        d.prototype._getParamName = function(d) {
            return "function" === typeof this.options.paramName ? this.options.paramName(d) : "" + this.options.paramName + (this.options.uploadMultiple ? "[" + d + "]" : "")
        }
        ;
        d.prototype._renameFilename = function(d) {
            return "function" !== typeof this.options.renameFilename ? d : this.options.renameFilename(d)
        }
        ;
        d.prototype.getFallbackForm = function() {
            var b, g;
            if (b = this.getExistingFallback())
                return b;
            b = '<div class="dz-fallback">';
            this.options.dictFallbackText && (b += "<p>" + this.options.dictFallbackText + "</p>");
            b += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>';
            b = d.createElement(b);
            "FORM" !== this.element.tagName ? (g = d.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'),
            g.appendChild(b)) : (this.element.setAttribute("enctype", "multipart/form-data"),
            this.element.setAttribute("method", this.options.method));
            return null != g ? g : b
        }
        ;
        d.prototype.getExistingFallback = function() {
            var d, b, g, f, c;
            b = function(d) {
                var b, g, f;
                g = 0;
                for (f = d.length; g < f; g++)
                    if (b = d[g],
                    /(^| )fallback($| )/.test(b.className))
                        return b
            }
            ;
            c = ["div", "form"];
            g = 0;
            for (f = c.length; g < f; g++)
                if (d = c[g],
                d = b(this.element.getElementsByTagName(d)))
                    return d
        }
        ;
        d.prototype.setupEventListeners = function() {
            var d, b, g, f, c, e, p;
            e = this.listeners;
            p = [];
            f = 0;
            for (c = e.length; f < c; f++)
                d = e[f],
                p.push(function() {
                    var f, c;
                    f = d.events;
                    c = [];
                    for (b in f)
                        g = f[b],
                        c.push(d.element.addEventListener(b, g, !1));
                    return c
                }());
            return p
        }
        ;
        d.prototype.removeEventListeners = function() {
            var d, b, g, f, c, e, p;
            e = this.listeners;
            p = [];
            f = 0;
            for (c = e.length; f < c; f++)
                d = e[f],
                p.push(function() {
                    var f, c;
                    f = d.events;
                    c = [];
                    for (b in f)
                        g = f[b],
                        c.push(d.element.removeEventListener(b, g, !1));
                    return c
                }());
            return p
        }
        ;
        d.prototype.disable = function() {
            var d, b, g, f, c;
            this.clickableElements.forEach(function(d) {
                return d.classList.remove("dz-clickable")
            });
            this.removeEventListeners();
            f = this.files;
            c = [];
            b = 0;
            for (g = f.length; b < g; b++)
                d = f[b],
                c.push(this.cancelUpload(d));
            return c
        }
        ;
        d.prototype.enable = function() {
            this.clickableElements.forEach(function(d) {
                return d.classList.add("dz-clickable")
            });
            return this.setupEventListeners()
        }
        ;
        d.prototype.filesize = function(d) {
            var b, g, f, c, e, p, l, k;
            f = 0;
            c = "b";
            if (0 < d) {
                p = ["TB", "GB", "MB", "KB", "b"];
                g = l = 0;
                for (k = p.length; l < k; g = ++l)
                    if (e = p[g],
                    b = Math.pow(this.options.filesizeBase, 4 - g) / 10,
                    d >= b) {
                        f = d / Math.pow(this.options.filesizeBase, 4 - g);
                        c = e;
                        break
                    }
                f = Math.round(10 * f) / 10
            }
            return "<strong>" + f + "</strong> " + c
        }
        ;
        d.prototype._updateMaxFilesReachedClass = function() {
            return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files),
            this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
        }
        ;
        d.prototype.drop = function(d) {
            var b;
            d.dataTransfer && (this.emit("drop", d),
            b = d.dataTransfer.files,
            this.emit("addedfiles", b),
            b.length && ((d = d.dataTransfer.items) && d.length && null != d[0].webkitGetAsEntry ? this._addFilesFromItems(d) : this.handleFiles(b)))
        }
        ;
        d.prototype.paste = function(d) {
            var b;
            if (null != (null != d ? null != (b = d.clipboardData) ? b.items : void 0 : void 0) && (this.emit("paste", d),
            d = d.clipboardData.items,
            d.length))
                return this._addFilesFromItems(d)
        }
        ;
        d.prototype.handleFiles = function(d) {
            var b, g, f, c;
            c = [];
            g = 0;
            for (f = d.length; g < f; g++)
                b = d[g],
                c.push(this.addFile(b));
            return c
        }
        ;
        d.prototype._addFilesFromItems = function(d) {
            var b, g, f, c, e;
            e = [];
            f = 0;
            for (c = d.length; f < c; f++)
                g = d[f],
                null != g.webkitGetAsEntry && (b = g.webkitGetAsEntry()) ? b.isFile ? e.push(this.addFile(g.getAsFile())) : b.isDirectory ? e.push(this._addFilesFromDirectory(b, b.name)) : e.push(void 0) : null != g.getAsFile ? null == g.kind || "file" === g.kind ? e.push(this.addFile(g.getAsFile())) : e.push(void 0) : e.push(void 0);
            return e
        }
        ;
        d.prototype._addFilesFromDirectory = function(d, b) {
            var g, f, c;
            g = d.createReader();
            f = function(d) {
                return "undefined" !== typeof console && null !== console ? "function" === typeof console.log ? console.log(d) : void 0 : void 0
            }
            ;
            c = function(d) {
                return function() {
                    return g.readEntries(function(g) {
                        var f, e, y;
                        if (0 < g.length) {
                            e = 0;
                            for (y = g.length; e < y; e++)
                                f = g[e],
                                f.isFile ? f.file(function(g) {
                                    if (!d.options.ignoreHiddenFiles || "." !== g.name.substring(0, 1))
                                        return g.fullPath = "" + b + "/" + g.name,
                                        d.addFile(g)
                                }) : f.isDirectory && d._addFilesFromDirectory(f, "" + b + "/" + f.name);
                            c()
                        }
                        return null
                    }, f)
                }
            }(this);
            return c()
        }
        ;
        d.prototype.accept = function(b, g) {
            return b.size > 1048576 * this.options.maxFilesize ? g(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(b.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : d.isValidFile(b, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (g(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)),
            this.emit("maxfilesexceeded", b)) : this.options.accept.call(this, b, g) : g(this.options.dictInvalidFileType)
        }
        ;
        d.prototype.addFile = function(b) {
            b.upload = {
                progress: 0,
                total: b.size,
                bytesSent: 0
            };
            this.files.push(b);
            b.status = d.ADDED;
            this.emit("addedfile", b);
            this._enqueueThumbnail(b);
            return this.accept(b, function(d) {
                return function(g) {
                    g ? (b.accepted = !1,
                    d._errorProcessing([b], g)) : (b.accepted = !0,
                    d.options.autoQueue && d.enqueueFile(b));
                    return d._updateMaxFilesReachedClass()
                }
            }(this))
        }
        ;
        d.prototype.enqueueFiles = function(d) {
            var b, g, f;
            g = 0;
            for (f = d.length; g < f; g++)
                b = d[g],
                this.enqueueFile(b);
            return null
        }
        ;
        d.prototype.enqueueFile = function(b) {
            if (b.status === d.ADDED && !0 === b.accepted) {
                if (b.status = d.QUEUED,
                this.options.autoProcessQueue)
                    return setTimeout(function(d) {
                        return function() {
                            return d.processQueue()
                        }
                    }(this), 0)
            } else
                throw Error("This file can't be queued because it has already been processed or was rejected.");
        }
        ;
        d.prototype._thumbnailQueue = [];
        d.prototype._processingThumbnail = !1;
        d.prototype._enqueueThumbnail = function(d) {
            if (this.options.createImageThumbnails && d.type.match(/image.*/) && d.size <= 1048576 * this.options.maxThumbnailFilesize)
                return this._thumbnailQueue.push(d),
                setTimeout(function(d) {
                    return function() {
                        return d._processThumbnailQueue()
                    }
                }(this), 0)
        }
        ;
        d.prototype._processThumbnailQueue = function() {
            if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length)
                return this._processingThumbnail = !0,
                this.createThumbnail(this._thumbnailQueue.shift(), function(d) {
                    return function() {
                        d._processingThumbnail = !1;
                        return d._processThumbnailQueue()
                    }
                }(this))
        }
        ;
        d.prototype.removeFile = function(b) {
            b.status === d.UPLOADING && this.cancelUpload(b);
            this.files = l(this.files, b);
            this.emit("removedfile", b);
            if (0 === this.files.length)
                return this.emit("reset")
        }
        ;
        d.prototype.removeAllFiles = function(b) {
            var g, f, c, e;
            null == b && (b = !1);
            e = this.files.slice();
            f = 0;
            for (c = e.length; f < c; f++)
                g = e[f],
                (g.status !== d.UPLOADING || b) && this.removeFile(g);
            return null
        }
        ;
        d.prototype.createThumbnail = function(d, b) {
            var g;
            g = new FileReader;
            g.onload = function(f) {
                return function() {
                    if ("image/svg+xml" === d.type)
                        f.emit("thumbnail", d, g.result),
                        null != b && b();
                    else
                        return f.createThumbnailFromUrl(d, g.result, b)
                }
            }(this);
            return g.readAsDataURL(d)
        }
        ;
        d.prototype.createThumbnailFromUrl = function(d, b, g, f) {
            var c;
            c = document.createElement("img");
            f && (c.crossOrigin = f);
            c.onload = function(b) {
                return function() {
                    var f, p, l, k, h, n, t;
                    d.width = c.width;
                    d.height = c.height;
                    l = b.options.resize.call(b, d);
                    null == l.trgWidth && (l.trgWidth = l.optWidth);
                    null == l.trgHeight && (l.trgHeight = l.optHeight);
                    f = document.createElement("canvas");
                    p = f.getContext("2d");
                    f.width = l.trgWidth;
                    f.height = l.trgHeight;
                    e(p, c, null != (k = l.srcX) ? k : 0, null != (h = l.srcY) ? h : 0, l.srcWidth, l.srcHeight, null != (n = l.trgX) ? n : 0, null != (t = l.trgY) ? t : 0, l.trgWidth, l.trgHeight);
                    f = f.toDataURL("image/png");
                    b.emit("thumbnail", d, f);
                    if (null != g)
                        return g()
                }
            }(this);
            null != g && (c.onerror = g);
            return c.src = b
        }
        ;
        d.prototype.processQueue = function() {
            var d, b, g, f;
            b = this.options.parallelUploads;
            d = g = this.getUploadingFiles().length;
            if (!(g >= b) && (f = this.getQueuedFiles(),
            0 < f.length)) {
                if (this.options.uploadMultiple)
                    return this.processFiles(f.slice(0, b - g));
                for (; d < b && f.length; )
                    this.processFile(f.shift()),
                    d++
            }
        }
        ;
        d.prototype.processFile = function(d) {
            return this.processFiles([d])
        }
        ;
        d.prototype.processFiles = function(b) {
            var g, f, c;
            f = 0;
            for (c = b.length; f < c; f++)
                g = b[f],
                g.processing = !0,
                g.status = d.UPLOADING,
                this.emit("processing", g);
            this.options.uploadMultiple && this.emit("processingmultiple", b);
            return this.uploadFiles(b)
        }
        ;
        d.prototype._getFilesWithXhr = function(d) {
            var b, g, f, c, e;
            c = this.files;
            e = [];
            g = 0;
            for (f = c.length; g < f; g++)
                b = c[g],
                b.xhr === d && e.push(b);
            return e
        }
        ;
        d.prototype.cancelUpload = function(b) {
            var g, f, c, e;
            if (b.status === d.UPLOADING) {
                f = this._getFilesWithXhr(b.xhr);
                c = 0;
                for (e = f.length; c < e; c++)
                    g = f[c],
                    g.status = d.CANCELED;
                b.xhr.abort();
                b = 0;
                for (c = f.length; b < c; b++)
                    g = f[b],
                    this.emit("canceled", g);
                this.options.uploadMultiple && this.emit("canceledmultiple", f)
            } else if ((g = b.status) === d.ADDED || g === d.QUEUED)
                b.status = d.CANCELED,
                this.emit("canceled", b),
                this.options.uploadMultiple && this.emit("canceledmultiple", [b]);
            if (this.options.autoProcessQueue)
                return this.processQueue()
        }
        ;
        k = function() {
            var d, b;
            b = arguments[0];
            d = 2 <= arguments.length ? m.call(arguments, 1) : [];
            return "function" === typeof b ? b.apply(this, d) : b
        }
        ;
        d.prototype.uploadFile = function(d) {
            return this.uploadFiles([d])
        }
        ;
        d.prototype.uploadFiles = function(b) {
            var g, f, e, p, l, h, n, m, V, M, J, B, w, D, H;
            w = new XMLHttpRequest;
            l = 0;
            for (B = b.length; l < B; l++)
                g = b[l],
                g.xhr = w;
            l = k(this.options.method, b);
            B = k(this.options.url, b);
            w.open(l, B, !0);
            w.withCredentials = !!this.options.withCredentials;
            M = null ;
            e = function(d) {
                return function() {
                    var f, c, e;
                    e = [];
                    f = 0;
                    for (c = b.length; f < c; f++)
                        g = b[f],
                        e.push(d._errorProcessing(b, M || d.options.dictResponseError.replace("{{statusCode}}", w.status), w));
                    return e
                }
            }(this);
            J = function(d) {
                return function(f) {
                    var c, e, p;
                    if (null != f)
                        for (c = 100 * f.loaded / f.total,
                        e = 0,
                        p = b.length; e < p; e++)
                            g = b[e],
                            g.upload = {
                                progress: c,
                                total: f.total,
                                bytesSent: f.loaded
                            };
                    else {
                        f = !0;
                        c = 100;
                        e = 0;
                        for (p = b.length; e < p; e++) {
                            g = b[e];
                            if (100 !== g.upload.progress || g.upload.bytesSent !== g.upload.total)
                                f = !1;
                            g.upload.progress = c;
                            g.upload.bytesSent = g.upload.total
                        }
                        if (f)
                            return
                    }
                    p = [];
                    f = 0;
                    for (e = b.length; f < e; f++)
                        g = b[f],
                        p.push(d.emit("uploadprogress", g, c, g.upload.bytesSent));
                    return p
                }
            }(this);
            w.onload = function(g) {
                return function(f) {
                    var c;
                    if (b[0].status !== d.CANCELED && 4 === w.readyState) {
                        M = w.responseText;
                        if (w.getResponseHeader("content-type") && ~w.getResponseHeader("content-type").indexOf("application/json"))
                            try {
                                M = JSON.parse(M)
                            } catch (p) {
                                f = p,
                                M = "Invalid JSON response from server."
                            }
                        J();
                        return 200 <= (c = w.status) && 300 > c ? g._finished(b, M, f) : e()
                    }
                }
            }(this);
            w.onerror = function(g) {
                return function() {
                    if (b[0].status !== d.CANCELED)
                        return e()
                }
            }(this);
            (null != (p = w.upload) ? p : w).onprogress = J;
            l = {
                Accept: "application/json",
                "Cache-Control": "no-cache",
                "X-Requested-With": "XMLHttpRequest"
            };
            this.options.headers && c(l, this.options.headers);
            for (f in l)
                (p = l[f]) && w.setRequestHeader(f, p);
            f = new FormData;
            if (this.options.params)
                for (m in l = this.options.params,
                l)
                    p = l[m],
                    f.append(m, p);
            m = 0;
            for (p = b.length; m < p; m++)
                g = b[m],
                this.emit("sending", g, w, f);
            this.options.uploadMultiple && this.emit("sendingmultiple", b, w, f);
            if ("FORM" === this.element.tagName)
                for (B = this.element.querySelectorAll("input, textarea, select, button"),
                p = 0,
                l = B.length; p < l; p++)
                    if (n = B[p],
                    m = n.getAttribute("name"),
                    V = n.getAttribute("type"),
                    "SELECT" === n.tagName && n.hasAttribute("multiple"))
                        for (H = n.options,
                        V = 0,
                        D = H.length; V < D; V++)
                            n = H[V],
                            n.selected && f.append(m, n.value);
                    else
                        (!V || "checkbox" !== (h = V.toLowerCase()) && "radio" !== h || n.checked) && f.append(m, n.value);
            h = m = 0;
            for (p = b.length - 1; 0 <= p ? m <= p : m >= p; h = 0 <= p ? ++m : --m)
                f.append(this._getParamName(h), b[h], this._renameFilename(b[h].name));
            return this.submitRequest(w, f, b)
        }
        ;
        d.prototype.submitRequest = function(d, b, g) {
            return d.send(b)
        }
        ;
        d.prototype._finished = function(b, g, f) {
            var c, e, p;
            e = 0;
            for (p = b.length; e < p; e++)
                c = b[e],
                c.status = d.SUCCESS,
                this.emit("success", c, g, f),
                this.emit("complete", c);
            this.options.uploadMultiple && (this.emit("successmultiple", b, g, f),
            this.emit("completemultiple", b));
            if (this.options.autoProcessQueue)
                return this.processQueue()
        }
        ;
        d.prototype._errorProcessing = function(b, g, f) {
            var c, e, p;
            e = 0;
            for (p = b.length; e < p; e++)
                c = b[e],
                c.status = d.ERROR,
                this.emit("error", c, g, f),
                this.emit("complete", c);
            this.options.uploadMultiple && (this.emit("errormultiple", b, g, f),
            this.emit("completemultiple", b));
            if (this.options.autoProcessQueue)
                return this.processQueue()
        }
        ;
        return d
    }(b);
    c.version = "4.3.0";
    c.options = {};
    c.optionsForElement = function(b) {
        if (b.getAttribute("id"))
            return c.options[k(b.getAttribute("id"))]
    }
    ;
    c.instances = [];
    c.forElement = function(b) {
        "string" === typeof b && (b = document.querySelector(b));
        if (null == (null != b ? b.dropzone : void 0))
            throw Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
        return b.dropzone
    }
    ;
    c.autoDiscover = !0;
    c.discover = function() {
        var b, d, g, e, p;
        document.querySelectorAll ? d = document.querySelectorAll(".dropzones") : (d = [],
        b = function(b) {
            var g, f, c, e;
            e = [];
            f = 0;
            for (c = b.length; f < c; f++)
                g = b[f],
                /(^| )dropzone($| )/.test(g.className) ? e.push(d.push(g)) : e.push(void 0);
            return e
        }
        ,
        b(document.getElementsByTagName("div")),
        b(document.getElementsByTagName("form")));
        p = [];
        g = 0;
        for (e = d.length; g < e; g++)
            b = d[g],
            !1 !== c.optionsForElement(b) ? p.push(new c(b)) : p.push(void 0);
        return p
    }
    ;
    c.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i];
    c.isBrowserSupported = function() {
        var b, d, g, e, p;
        b = !0;
        if (window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)
            if ("classList"in document.createElement("a"))
                for (p = c.blacklistedBrowsers,
                g = 0,
                e = p.length; g < e; g++)
                    d = p[g],
                    d.test(navigator.userAgent) && (b = !1);
            else
                b = !1;
        else
            b = !1;
        return b
    }
    ;
    l = function(b, d) {
        var g, c, e, p;
        p = [];
        c = 0;
        for (e = b.length; c < e; c++)
            g = b[c],
            g !== d && p.push(g);
        return p
    }
    ;
    k = function(b) {
        return b.replace(/[\-_](\w)/g, function(d) {
            return d.charAt(1).toUpperCase()
        })
    }
    ;
    c.createElement = function(b) {
        var d;
        d = document.createElement("div");
        d.innerHTML = b;
        return d.childNodes[0]
    }
    ;
    c.elementInside = function(b, d) {
        if (b === d)
            return !0;
        for (; b = b.parentNode; )
            if (b === d)
                return !0;
        return !1
    }
    ;
    c.getElement = function(b, d) {
        var g;
        "string" === typeof b ? g = document.querySelector(b) : null != b.nodeType && (g = b);
        if (null == g)
            throw Error("Invalid `" + d + "` option provided. Please provide a CSS selector or a plain HTML element.");
        return g
    }
    ;
    c.getElements = function(b, d) {
        var g, c, e, p, l;
        if (b instanceof Array) {
            c = [];
            try {
                for (e = 0,
                p = b.length; e < p; e++)
                    g = b[e],
                    c.push(this.getElement(g, d))
            } catch (k) {
                c = null
            }
        } else if ("string" === typeof b)
            for (c = [],
            l = document.querySelectorAll(b),
            e = 0,
            p = l.length; e < p; e++)
                g = l[e],
                c.push(g);
        else
            null != b.nodeType && (c = [b]);
        if (null == c || !c.length)
            throw Error("Invalid `" + d + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
        return c
    }
    ;
    c.confirm = function(b, d, g) {
        if (window.confirm(b))
            return d();
        if (null != g)
            return g()
    }
    ;
    c.isValidFile = function(b, d) {
        var g, c, e, p, l;
        if (!d)
            return !0;
        d = d.split(",");
        c = b.type;
        g = c.replace(/\/.*$/, "");
        p = 0;
        for (l = d.length; p < l; p++)
            if (e = d[p],
            e = e.trim(),
            "." === e.charAt(0)) {
                if (-1 !== b.name.toLowerCase().indexOf(e.toLowerCase(), b.name.length - e.length))
                    return !0
            } else if (/\/\*$/.test(e)) {
                if (g === e.replace(/\/.*$/, ""))
                    return !0
            } else if (c === e)
                return !0;
        return !1
    }
    ;
    "undefined" !== typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function(b) {
        return this.each(function() {
            return new c(this,b)
        })
    }
    );
    "undefined" !== typeof module && null !== module ? module.exports = c : window.Dropzone = c;
    c.ADDED = "added";
    c.QUEUED = "queued";
    c.ACCEPTED = c.QUEUED;
    c.UPLOADING = "uploading";
    c.PROCESSING = c.UPLOADING;
    c.CANCELED = "canceled";
    c.ERROR = "error";
    c.SUCCESS = "success";
    h = function(b) {
        var d, g, c, e, p;
        c = b.naturalHeight;
        d = document.createElement("canvas");
        d.width = 1;
        d.height = c;
        d = d.getContext("2d");
        d.drawImage(b, 0, 0);
        d = d.getImageData(0, 0, 1, c).data;
        p = 0;
        for (e = g = c; e > p; )
            b = d[4 * (e - 1) + 3],
            0 === b ? g = e : p = e,
            e = g + p >> 1;
        c = e / c;
        return 0 === c ? 1 : c
    }
    ;
    e = function(b, d, g, c, e, p, l, k, n, m) {
        var ya;
        ya = h(d);
        return b.drawImage(d, g, c, e, p, l, k, n, m / ya)
    }
    ;
    c._autoDiscoverFunction = function() {
        if (c.autoDiscover)
            return c.discover()
    }
    ;
    (function(b, d) {
        var g, c, e, p, l, k, h, n, m;
        e = !1;
        m = !0;
        c = b.document;
        n = c.documentElement;
        g = c.addEventListener ? "addEventListener" : "attachEvent";
        h = c.addEventListener ? "removeEventListener" : "detachEvent";
        k = c.addEventListener ? "" : "on";
        p = function(g) {
            if ("readystatechange" !== g.type || "complete" === c.readyState)
                if (("load" === g.type ? b : c)[h](k + g.type, p, !1),
                !e && (e = !0))
                    return d.call(b, g.type || g)
        }
        ;
        l = function() {
            try {
                n.doScroll("left")
            } catch (d) {
                setTimeout(l, 50);
                return
            }
            return p("poll")
        }
        ;
        if ("complete" !== c.readyState) {
            if (c.createEventObject && n.doScroll) {
                try {
                    m = !b.frameElement
                } catch (pb) {}
                m && l()
            }
            c[g](k + "DOMContentLoaded", p, !1);
            c[g](k + "readystatechange", p, !1);
            return b[g](k + "load", p, !1)
        }
    })(window, c._autoDiscoverFunction)
}
).call(this);
(function(c) {
    "function" === typeof define && define.amd ? define(["jquery"], function(b) {
        c(b, document, window, navigator)
    }) : c(jQuery, document, window, navigator)
})(function(c, b, k, h, e) {
    var n = 0
      , l = function() {
        var b = h.userAgent
          , e = /msie\s\d+/i;
        return 0 < b.search(e) && (b = e.exec(b).toString(),
        b = b.split(" ")[1],
        9 > b) ? (c("html").addClass("lt-ie9"),
        !0) : !1
    }();
    Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this
          , f = [].slice;
        if ("function" != typeof c)
            throw new TypeError;
        var d = f.call(arguments, 1)
          , e = function() {
            if (this instanceof e) {
                var l = function() {};
                l.prototype = c.prototype;
                var l = new l
                  , k = c.apply(l, d.concat(f.call(arguments)));
                return Object(k) === k ? k : l
            }
            return c.apply(b, d.concat(f.call(arguments)))
        };
        return e
    }
    );
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b, c) {
        var f;
        if (null == this)
            throw new TypeError('"this" is null or not defined');
        var d = Object(this)
          , e = d.length >>> 0;
        if (0 === e)
            return -1;
        f = +c || 0;
        Infinity === Math.abs(f) && (f = 0);
        if (f >= e)
            return -1;
        for (f = Math.max(0 <= f ? f : e - Math.abs(f), 0); f < e; ) {
            if (f in d && d[f] === b)
                return f;
            f++
        }
        return -1
    }
    );
    var m = function(g, e, f) {
        this.VERSION = "2.1.4";
        this.input = g;
        this.plugin_count = f;
        this.old_to = this.old_from = this.update_tm = this.calc_count = this.current_plugin = 0;
        this.raf_id = this.old_min_interval = null ;
        this.is_update = this.is_key = this.no_diapason = this.force_redraw = this.dragging = !1;
        this.is_start = !0;
        this.is_click = this.is_resize = this.is_active = this.is_finish = !1;
        this.$cache = {
            win: c(k),
            body: c(b.body),
            input: c(g),
            cont: null ,
            rs: null ,
            min: null ,
            max: null ,
            from: null ,
            to: null ,
            single: null ,
            bar: null ,
            line: null ,
            s_single: null ,
            s_from: null ,
            s_to: null ,
            shad_single: null ,
            shad_from: null ,
            shad_to: null ,
            edge: null ,
            grid: null ,
            grid_labels: []
        };
        this.coords = {
            x_gap: 0,
            x_pointer: 0,
            w_rs: 0,
            w_rs_old: 0,
            w_handle: 0,
            p_gap: 0,
            p_gap_left: 0,
            p_gap_right: 0,
            p_step: 0,
            p_pointer: 0,
            p_handle: 0,
            p_single_fake: 0,
            p_single_real: 0,
            p_from_fake: 0,
            p_from_real: 0,
            p_to_fake: 0,
            p_to_real: 0,
            p_bar_x: 0,
            p_bar_w: 0,
            grid_gap: 0,
            big_num: 0,
            big: [],
            big_w: [],
            big_p: [],
            big_x: []
        };
        this.labels = {
            w_min: 0,
            w_max: 0,
            w_from: 0,
            w_to: 0,
            w_single: 0,
            p_min: 0,
            p_max: 0,
            p_from_fake: 0,
            p_from_left: 0,
            p_to_fake: 0,
            p_to_left: 0,
            p_single_fake: 0,
            p_single_left: 0
        };
        var d = this.$cache.input;
        g = d.prop("value");
        var l;
        f = {
            type: "single",
            min: 10,
            max: 100,
            from: null ,
            to: null ,
            step: 1,
            min_interval: 0,
            max_interval: 0,
            drag_interval: !1,
            values: [],
            p_values: [],
            from_fixed: !1,
            from_min: null ,
            from_max: null ,
            from_shadow: !1,
            to_fixed: !1,
            to_min: null ,
            to_max: null ,
            to_shadow: !1,
            prettify_enabled: !0,
            prettify_separator: " ",
            prettify: null ,
            force_edges: !1,
            keyboard: !1,
            keyboard_step: 5,
            grid: !1,
            grid_margin: !0,
            grid_num: 4,
            grid_snap: !1,
            hide_min_max: !1,
            hide_from_to: !1,
            prefix: "",
            postfix: "",
            max_postfix: "",
            decorate_both: !0,
            values_separator: " \u2014 ",
            input_values_separator: ";",
            disable: !1,
            onStart: null ,
            onChange: null ,
            onFinish: null ,
            onUpdate: null
        };
        d = {
            type: d.data("type"),
            min: d.data("min"),
            max: d.data("max"),
            from: d.data("from"),
            to: d.data("to"),
            step: d.data("step"),
            min_interval: d.data("minInterval"),
            max_interval: d.data("maxInterval"),
            drag_interval: d.data("dragInterval"),
            values: d.data("values"),
            from_fixed: d.data("fromFixed"),
            from_min: d.data("fromMin"),
            from_max: d.data("fromMax"),
            from_shadow: d.data("fromShadow"),
            to_fixed: d.data("toFixed"),
            to_min: d.data("toMin"),
            to_max: d.data("toMax"),
            to_shadow: d.data("toShadow"),
            prettify_enabled: d.data("prettifyEnabled"),
            prettify_separator: d.data("prettifySeparator"),
            force_edges: d.data("forceEdges"),
            keyboard: d.data("keyboard"),
            keyboard_step: d.data("keyboardStep"),
            grid: d.data("grid"),
            grid_margin: d.data("gridMargin"),
            grid_num: d.data("gridNum"),
            grid_snap: d.data("gridSnap"),
            hide_min_max: d.data("hideMinMax"),
            hide_from_to: d.data("hideFromTo"),
            prefix: d.data("prefix"),
            postfix: d.data("postfix"),
            max_postfix: d.data("maxPostfix"),
            decorate_both: d.data("decorateBoth"),
            values_separator: d.data("valuesSeparator"),
            input_values_separator: d.data("inputValuesSeparator"),
            disable: d.data("disable")
        };
        d.values = d.values && d.values.split(",");
        for (l in d)
            d.hasOwnProperty(l) && (d[l] || 0 === d[l] || delete d[l]);
        g && (g = g.split(d.input_values_separator || e.input_values_separator || ";"),
        g[0] && g[0] == +g[0] && (g[0] = +g[0]),
        g[1] && g[1] == +g[1] && (g[1] = +g[1]),
        e && e.values && e.values.length ? (f.from = g[0] && e.values.indexOf(g[0]),
        f.to = g[1] && e.values.indexOf(g[1])) : (f.from = g[0] && +g[0],
        f.to = g[1] && +g[1]));
        c.extend(f, e);
        c.extend(f, d);
        this.options = f;
        this.validate();
        this.result = {
            input: this.$cache.input,
            slider: null ,
            min: this.options.min,
            max: this.options.max,
            from: this.options.from,
            from_percent: 0,
            from_value: null ,
            to: this.options.to,
            to_percent: 0,
            to_value: null
        };
        this.init()
    };
    m.prototype = {
        init: function(b) {
            this.no_diapason = !1;
            this.coords.p_step = this.convertToPercent(this.options.step, !0);
            this.target = "base";
            this.toggleInput();
            this.append();
            this.setMinMax();
            b ? (this.force_redraw = !0,
            this.calc(!0),
            this.callOnUpdate()) : (this.force_redraw = !0,
            this.calc(!0),
            this.callOnStart());
            this.updateScene()
        },
        append: function() {
            this.$cache.input.before('<span class="irs js-irs-' + this.plugin_count + '"></span>');
            this.$cache.input.prop("readonly", !0);
            this.$cache.cont = this.$cache.input.prev();
            this.result.slider = this.$cache.cont;
            this.$cache.cont.html('<span class="irs"><span class="irs-line" tabindex="-1"><span class="irs-line-left"></span><span class="irs-line-mid"></span><span class="irs-line-right"></span></span><span class="irs-min">0</span><span class="irs-max">1</span><span class="irs-from">0</span><span class="irs-to">0</span><span class="irs-single">0</span></span><span class="irs-grid"></span><span class="irs-bar"></span>');
            this.$cache.rs = this.$cache.cont.find(".irs");
            this.$cache.min = this.$cache.cont.find(".irs-min");
            this.$cache.max = this.$cache.cont.find(".irs-max");
            this.$cache.from = this.$cache.cont.find(".irs-from");
            this.$cache.to = this.$cache.cont.find(".irs-to");
            this.$cache.single = this.$cache.cont.find(".irs-single");
            this.$cache.bar = this.$cache.cont.find(".irs-bar");
            this.$cache.line = this.$cache.cont.find(".irs-line");
            this.$cache.grid = this.$cache.cont.find(".irs-grid");
            "single" === this.options.type ? (this.$cache.cont.append('<span class="irs-bar-edge"></span><span class="irs-shadow shadow-single"></span><span class="irs-slider single"></span>'),
            this.$cache.edge = this.$cache.cont.find(".irs-bar-edge"),
            this.$cache.s_single = this.$cache.cont.find(".single"),
            this.$cache.from[0].style.visibility = "hidden",
            this.$cache.to[0].style.visibility = "hidden",
            this.$cache.shad_single = this.$cache.cont.find(".shadow-single")) : (this.$cache.cont.append('<span class="irs-shadow shadow-from"></span><span class="irs-shadow shadow-to"></span><span class="irs-slider from"></span><span class="irs-slider to"></span>'),
            this.$cache.s_from = this.$cache.cont.find(".from"),
            this.$cache.s_to = this.$cache.cont.find(".to"),
            this.$cache.shad_from = this.$cache.cont.find(".shadow-from"),
            this.$cache.shad_to = this.$cache.cont.find(".shadow-to"),
            this.setTopHandler());
            this.options.hide_from_to && (this.$cache.from[0].style.display = "none",
            this.$cache.to[0].style.display = "none",
            this.$cache.single[0].style.display = "none");
            this.appendGrid();
            this.options.disable ? (this.appendDisableMask(),
            this.$cache.input[0].disabled = !0) : (this.$cache.cont.removeClass("irs-disabled"),
            this.$cache.input[0].disabled = !1,
            this.bindEvents());
            this.options.drag_interval && (this.$cache.bar[0].style.cursor = "ew-resize")
        },
        setTopHandler: function() {
            var b = this.options.max
              , c = this.options.to;
            this.options.from > this.options.min && c === b ? this.$cache.s_from.addClass("type_last") : c < b && this.$cache.s_to.addClass("type_last")
        },
        changeLevel: function(b) {
            switch (b) {
            case "single":
                this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_single_fake);
                break;
            case "from":
                this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake);
                this.$cache.s_from.addClass("state_hover");
                this.$cache.s_from.addClass("type_last");
                this.$cache.s_to.removeClass("type_last");
                break;
            case "to":
                this.coords.p_gap = this.toFixed(this.coords.p_pointer - this.coords.p_to_fake);
                this.$cache.s_to.addClass("state_hover");
                this.$cache.s_to.addClass("type_last");
                this.$cache.s_from.removeClass("type_last");
                break;
            case "both":
                this.coords.p_gap_left = this.toFixed(this.coords.p_pointer - this.coords.p_from_fake),
                this.coords.p_gap_right = this.toFixed(this.coords.p_to_fake - this.coords.p_pointer),
                this.$cache.s_to.removeClass("type_last"),
                this.$cache.s_from.removeClass("type_last")
            }
        },
        appendDisableMask: function() {
            this.$cache.cont.append('<span class="irs-disable-mask"></span>');
            this.$cache.cont.addClass("irs-disabled")
        },
        remove: function() {
            this.$cache.cont.remove();
            this.$cache.cont = null ;
            this.$cache.line.off("keydown.irs_" + this.plugin_count);
            this.$cache.body.off("touchmove.irs_" + this.plugin_count);
            this.$cache.body.off("mousemove.irs_" + this.plugin_count);
            this.$cache.win.off("touchend.irs_" + this.plugin_count);
            this.$cache.win.off("mouseup.irs_" + this.plugin_count);
            l && (this.$cache.body.off("mouseup.irs_" + this.plugin_count),
            this.$cache.body.off("mouseleave.irs_" + this.plugin_count));
            this.$cache.grid_labels = [];
            this.coords.big = [];
            this.coords.big_w = [];
            this.coords.big_p = [];
            this.coords.big_x = [];
            cancelAnimationFrame(this.raf_id)
        },
        bindEvents: function() {
            if (!this.no_diapason) {
                this.$cache.body.on("touchmove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.body.on("mousemove.irs_" + this.plugin_count, this.pointerMove.bind(this));
                this.$cache.win.on("touchend.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.win.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this));
                this.$cache.line.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.$cache.line.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"));
                this.options.drag_interval && "double" === this.options.type ? (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "both")),
                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "both"))) : (this.$cache.bar.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                this.$cache.bar.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")));
                "single" === this.options.type ? (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                this.$cache.s_single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                this.$cache.shad_single.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                this.$cache.s_single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "single")),
                this.$cache.edge.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                this.$cache.shad_single.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click"))) : (this.$cache.single.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, null )),
                this.$cache.single.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, null )),
                this.$cache.from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                this.$cache.s_from.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                this.$cache.to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                this.$cache.s_to.on("touchstart.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                this.$cache.shad_from.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                this.$cache.shad_to.on("touchstart.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                this.$cache.from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                this.$cache.s_from.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "from")),
                this.$cache.to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                this.$cache.s_to.on("mousedown.irs_" + this.plugin_count, this.pointerDown.bind(this, "to")),
                this.$cache.shad_from.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")),
                this.$cache.shad_to.on("mousedown.irs_" + this.plugin_count, this.pointerClick.bind(this, "click")));
                if (this.options.keyboard)
                    this.$cache.line.on("keydown.irs_" + this.plugin_count, this.key.bind(this, "keyboard"));
                l && (this.$cache.body.on("mouseup.irs_" + this.plugin_count, this.pointerUp.bind(this)),
                this.$cache.body.on("mouseleave.irs_" + this.plugin_count, this.pointerUp.bind(this)))
            }
        },
        pointerMove: function(b) {
            this.dragging && (this.coords.x_pointer = (b.pageX || b.originalEvent.touches && b.originalEvent.touches[0].pageX) - this.coords.x_gap,
            this.calc())
        },
        pointerUp: function(b) {
            if (this.current_plugin === this.plugin_count && this.is_active) {
                this.is_active = !1;
                this.$cache.cont.find(".state_hover").removeClass("state_hover");
                this.force_redraw = !0;
                l && c("*").prop("unselectable", !1);
                this.updateScene();
                this.restoreOriginalMinInterval();
                if (c.contains(this.$cache.cont[0], b.target) || this.dragging)
                    this.is_finish = !0,
                    this.callOnFinish();
                this.dragging = !1
            }
        },
        pointerDown: function(b, e) {
            e.preventDefault();
            var f = e.pageX || e.originalEvent.touches && e.originalEvent.touches[0].pageX;
            2 !== e.button && ("both" === b && this.setTempMinInterval(),
            b || (b = this.target),
            this.current_plugin = this.plugin_count,
            this.target = b,
            this.dragging = this.is_active = !0,
            this.coords.x_gap = this.$cache.rs.offset().left,
            this.coords.x_pointer = f - this.coords.x_gap,
            this.calcPointerPercent(),
            this.changeLevel(b),
            l && c("*").prop("unselectable", !0),
            this.$cache.line.trigger("focus"),
            this.updateScene())
        },
        pointerClick: function(b, c) {
            c.preventDefault();
            var f = c.pageX || c.originalEvent.touches && c.originalEvent.touches[0].pageX;
            2 !== c.button && (this.current_plugin = this.plugin_count,
            this.target = b,
            this.is_click = !0,
            this.coords.x_gap = this.$cache.rs.offset().left,
            this.coords.x_pointer = +(f - this.coords.x_gap).toFixed(),
            this.force_redraw = !0,
            this.calc(),
            this.$cache.line.trigger("focus"))
        },
        key: function(b, c) {
            if (!(this.current_plugin !== this.plugin_count || c.altKey || c.ctrlKey || c.shiftKey || c.metaKey)) {
                switch (c.which) {
                case 83:
                case 65:
                case 40:
                case 37:
                    c.preventDefault();
                    this.moveByKey(!1);
                    break;
                case 87:
                case 68:
                case 38:
                case 39:
                    c.preventDefault(),
                    this.moveByKey(!0)
                }
                return !0
            }
        },
        moveByKey: function(b) {
            var c = this.coords.p_pointer
              , c = b ? c + this.options.keyboard_step : c - this.options.keyboard_step;
            this.coords.x_pointer = this.toFixed(this.coords.w_rs / 100 * c);
            this.is_key = !0;
            this.calc()
        },
        setMinMax: function() {
            this.options && (this.options.hide_min_max ? (this.$cache.min[0].style.display = "none",
            this.$cache.max[0].style.display = "none") : (this.options.values.length ? (this.$cache.min.html(this.decorate(this.options.p_values[this.options.min])),
            this.$cache.max.html(this.decorate(this.options.p_values[this.options.max]))) : (this.$cache.min.html(this.decorate(this._prettify(this.options.min), this.options.min)),
            this.$cache.max.html(this.decorate(this._prettify(this.options.max), this.options.max))),
            this.labels.w_min = this.$cache.min.outerWidth(!1),
            this.labels.w_max = this.$cache.max.outerWidth(!1)))
        },
        setTempMinInterval: function() {
            var b = this.result.to - this.result.from;
            null === this.old_min_interval && (this.old_min_interval = this.options.min_interval);
            this.options.min_interval = b
        },
        restoreOriginalMinInterval: function() {
            null !== this.old_min_interval && (this.options.min_interval = this.old_min_interval,
            this.old_min_interval = null )
        },
        calc: function(b) {
            if (this.options) {
                this.calc_count++;
                if (10 === this.calc_count || b)
                    this.calc_count = 0,
                    this.coords.w_rs = this.$cache.rs.outerWidth(!1),
                    this.calcHandlePercent();
                if (this.coords.w_rs) {
                    this.calcPointerPercent();
                    b = this.getHandleX();
                    "click" === this.target && (this.coords.p_gap = this.coords.p_handle / 2,
                    b = this.getHandleX(),
                    this.target = this.options.drag_interval ? "both_one" : this.chooseHandle(b));
                    switch (this.target) {
                    case "base":
                        var c = (this.options.max - this.options.min) / 100;
                        b = (this.result.from - this.options.min) / c;
                        c = (this.result.to - this.options.min) / c;
                        this.coords.p_single_real = this.toFixed(b);
                        this.coords.p_from_real = this.toFixed(b);
                        this.coords.p_to_real = this.toFixed(c);
                        this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                        this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                        this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        this.target = null ;
                        break;
                    case "single":
                        if (this.options.from_fixed)
                            break;
                        this.coords.p_single_real = this.convertToRealPercent(b);
                        this.coords.p_single_real = this.calcWithStep(this.coords.p_single_real);
                        this.coords.p_single_real = this.checkDiapason(this.coords.p_single_real, this.options.from_min, this.options.from_max);
                        this.coords.p_single_fake = this.convertToFakePercent(this.coords.p_single_real);
                        break;
                    case "from":
                        if (this.options.from_fixed)
                            break;
                        this.coords.p_from_real = this.convertToRealPercent(b);
                        this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                        this.coords.p_from_real > this.coords.p_to_real && (this.coords.p_from_real = this.coords.p_to_real);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                        this.coords.p_from_real = this.checkMaxInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                        this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                        break;
                    case "to":
                        if (this.options.to_fixed)
                            break;
                        this.coords.p_to_real = this.convertToRealPercent(b);
                        this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                        this.coords.p_to_real < this.coords.p_from_real && (this.coords.p_to_real = this.coords.p_from_real);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                        this.coords.p_to_real = this.checkMaxInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                        this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        break;
                    case "both":
                        if (this.options.from_fixed || this.options.to_fixed)
                            break;
                        b = this.toFixed(b + .1 * this.coords.p_handle);
                        this.coords.p_from_real = this.convertToRealPercent(b) - this.coords.p_gap_left;
                        this.coords.p_from_real = this.calcWithStep(this.coords.p_from_real);
                        this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                        this.coords.p_from_real = this.checkMinInterval(this.coords.p_from_real, this.coords.p_to_real, "from");
                        this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                        this.coords.p_to_real = this.convertToRealPercent(b) + this.coords.p_gap_right;
                        this.coords.p_to_real = this.calcWithStep(this.coords.p_to_real);
                        this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                        this.coords.p_to_real = this.checkMinInterval(this.coords.p_to_real, this.coords.p_from_real, "to");
                        this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real);
                        break;
                    case "both_one":
                        if (!this.options.from_fixed && !this.options.to_fixed) {
                            var f = this.convertToRealPercent(b);
                            b = this.result.to_percent - this.result.from_percent;
                            var d = b / 2
                              , c = f - d
                              , f = f + d;
                            0 > c && (c = 0,
                            f = c + b);
                            100 < f && (f = 100,
                            c = f - b);
                            this.coords.p_from_real = this.calcWithStep(c);
                            this.coords.p_from_real = this.checkDiapason(this.coords.p_from_real, this.options.from_min, this.options.from_max);
                            this.coords.p_from_fake = this.convertToFakePercent(this.coords.p_from_real);
                            this.coords.p_to_real = this.calcWithStep(f);
                            this.coords.p_to_real = this.checkDiapason(this.coords.p_to_real, this.options.to_min, this.options.to_max);
                            this.coords.p_to_fake = this.convertToFakePercent(this.coords.p_to_real)
                        }
                    }
                    "single" === this.options.type ? (this.coords.p_bar_x = this.coords.p_handle / 2,
                    this.coords.p_bar_w = this.coords.p_single_fake,
                    this.result.from_percent = this.coords.p_single_real,
                    this.result.from = this.convertToValue(this.coords.p_single_real),
                    this.options.values.length && (this.result.from_value = this.options.values[this.result.from])) : (this.coords.p_bar_x = this.toFixed(this.coords.p_from_fake + this.coords.p_handle / 2),
                    this.coords.p_bar_w = this.toFixed(this.coords.p_to_fake - this.coords.p_from_fake),
                    this.result.from_percent = this.coords.p_from_real,
                    this.result.from = this.convertToValue(this.coords.p_from_real),
                    this.result.to_percent = this.coords.p_to_real,
                    this.result.to = this.convertToValue(this.coords.p_to_real),
                    this.options.values.length && (this.result.from_value = this.options.values[this.result.from],
                    this.result.to_value = this.options.values[this.result.to]));
                    this.calcMinMax();
                    this.calcLabels()
                }
            }
        },
        calcPointerPercent: function() {
            this.coords.w_rs ? (0 > this.coords.x_pointer || isNaN(this.coords.x_pointer) ? this.coords.x_pointer = 0 : this.coords.x_pointer > this.coords.w_rs && (this.coords.x_pointer = this.coords.w_rs),
            this.coords.p_pointer = this.toFixed(this.coords.x_pointer / this.coords.w_rs * 100)) : this.coords.p_pointer = 0
        },
        convertToRealPercent: function(b) {
            return b / (100 - this.coords.p_handle) * 100
        },
        convertToFakePercent: function(b) {
            return b / 100 * (100 - this.coords.p_handle)
        },
        getHandleX: function() {
            var b = 100 - this.coords.p_handle
              , c = this.toFixed(this.coords.p_pointer - this.coords.p_gap);
            0 > c ? c = 0 : c > b && (c = b);
            return c
        },
        calcHandlePercent: function() {
            this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1);
            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100)
        },
        chooseHandle: function(b) {
            return "single" === this.options.type ? "single" : b >= this.coords.p_from_real + (this.coords.p_to_real - this.coords.p_from_real) / 2 ? this.options.to_fixed ? "from" : "to" : this.options.from_fixed ? "to" : "from"
        },
        calcMinMax: function() {
            this.coords.w_rs && (this.labels.p_min = this.labels.w_min / this.coords.w_rs * 100,
            this.labels.p_max = this.labels.w_max / this.coords.w_rs * 100)
        },
        calcLabels: function() {
            this.coords.w_rs && !this.options.hide_from_to && ("single" === this.options.type ? (this.labels.w_single = this.$cache.single.outerWidth(!1),
            this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100,
            this.labels.p_single_left = this.coords.p_single_fake + this.coords.p_handle / 2 - this.labels.p_single_fake / 2) : (this.labels.w_from = this.$cache.from.outerWidth(!1),
            this.labels.p_from_fake = this.labels.w_from / this.coords.w_rs * 100,
            this.labels.p_from_left = this.coords.p_from_fake + this.coords.p_handle / 2 - this.labels.p_from_fake / 2,
            this.labels.p_from_left = this.toFixed(this.labels.p_from_left),
            this.labels.p_from_left = this.checkEdges(this.labels.p_from_left, this.labels.p_from_fake),
            this.labels.w_to = this.$cache.to.outerWidth(!1),
            this.labels.p_to_fake = this.labels.w_to / this.coords.w_rs * 100,
            this.labels.p_to_left = this.coords.p_to_fake + this.coords.p_handle / 2 - this.labels.p_to_fake / 2,
            this.labels.p_to_left = this.toFixed(this.labels.p_to_left),
            this.labels.p_to_left = this.checkEdges(this.labels.p_to_left, this.labels.p_to_fake),
            this.labels.w_single = this.$cache.single.outerWidth(!1),
            this.labels.p_single_fake = this.labels.w_single / this.coords.w_rs * 100,
            this.labels.p_single_left = (this.labels.p_from_left + this.labels.p_to_left + this.labels.p_to_fake) / 2 - this.labels.p_single_fake / 2,
            this.labels.p_single_left = this.toFixed(this.labels.p_single_left)),
            this.labels.p_single_left = this.checkEdges(this.labels.p_single_left, this.labels.p_single_fake))
        },
        updateScene: function() {
            this.raf_id && (cancelAnimationFrame(this.raf_id),
            this.raf_id = null );
            clearTimeout(this.update_tm);
            this.update_tm = null ;
            this.options && (this.drawHandles(),
            this.is_active ? this.raf_id = requestAnimationFrame(this.updateScene.bind(this)) : this.update_tm = setTimeout(this.updateScene.bind(this), 300))
        },
        drawHandles: function() {
            this.coords.w_rs = this.$cache.rs.outerWidth(!1);
            if (this.coords.w_rs) {
                this.coords.w_rs !== this.coords.w_rs_old && (this.target = "base",
                this.is_resize = !0);
                if (this.coords.w_rs !== this.coords.w_rs_old || this.force_redraw)
                    this.setMinMax(),
                    this.calc(!0),
                    this.drawLabels(),
                    this.options.grid && (this.calcGridMargin(),
                    this.calcGridLabels()),
                    this.force_redraw = !0,
                    this.coords.w_rs_old = this.coords.w_rs,
                    this.drawShadow();
                if (this.coords.w_rs && (this.dragging || this.force_redraw || this.is_key)) {
                    if (this.old_from !== this.result.from || this.old_to !== this.result.to || this.force_redraw || this.is_key) {
                        this.drawLabels();
                        this.$cache.bar[0].style.left = this.coords.p_bar_x + "%";
                        this.$cache.bar[0].style.width = this.coords.p_bar_w + "%";
                        if ("single" === this.options.type)
                            this.$cache.s_single[0].style.left = this.coords.p_single_fake + "%",
                            this.$cache.single[0].style.left = this.labels.p_single_left + "%",
                            this.options.values.length ? this.$cache.input.prop("value", this.result.from_value) : this.$cache.input.prop("value", this.result.from),
                            this.$cache.input.data("from", this.result.from);
                        else {
                            this.$cache.s_from[0].style.left = this.coords.p_from_fake + "%";
                            this.$cache.s_to[0].style.left = this.coords.p_to_fake + "%";
                            if (this.old_from !== this.result.from || this.force_redraw)
                                this.$cache.from[0].style.left = this.labels.p_from_left + "%";
                            if (this.old_to !== this.result.to || this.force_redraw)
                                this.$cache.to[0].style.left = this.labels.p_to_left + "%";
                            this.$cache.single[0].style.left = this.labels.p_single_left + "%";
                            this.options.values.length ? this.$cache.input.prop("value", this.result.from_value + this.options.input_values_separator + this.result.to_value) : this.$cache.input.prop("value", this.result.from + this.options.input_values_separator + this.result.to);
                            this.$cache.input.data("from", this.result.from);
                            this.$cache.input.data("to", this.result.to)
                        }
                        this.old_from === this.result.from && this.old_to === this.result.to || this.is_start || this.$cache.input.trigger("change");
                        this.old_from = this.result.from;
                        this.old_to = this.result.to;
                        this.is_resize || this.is_update || this.is_start || this.is_finish || this.callOnChange();
                        if (this.is_key || this.is_click)
                            this.is_click = this.is_key = !1,
                            this.callOnFinish();
                        this.is_finish = this.is_resize = this.is_update = !1
                    }
                    this.force_redraw = this.is_click = this.is_key = this.is_start = !1
                }
            }
        },
        drawLabels: function() {
            if (this.options) {
                var b = this.options.values.length, c = this.options.p_values, f;
                if (!this.options.hide_from_to)
                    if ("single" === this.options.type)
                        b = b ? this.decorate(c[this.result.from]) : this.decorate(this._prettify(this.result.from), this.result.from),
                        this.$cache.single.html(b),
                        this.calcLabels(),
                        this.$cache.min[0].style.visibility = this.labels.p_single_left < this.labels.p_min + 1 ? "hidden" : "visible",
                        this.$cache.max[0].style.visibility = this.labels.p_single_left + this.labels.p_single_fake > 100 - this.labels.p_max - 1 ? "hidden" : "visible";
                    else {
                        b ? (this.options.decorate_both ? (b = this.decorate(c[this.result.from]),
                        b += this.options.values_separator,
                        b += this.decorate(c[this.result.to])) : b = this.decorate(c[this.result.from] + this.options.values_separator + c[this.result.to]),
                        f = this.decorate(c[this.result.from]),
                        c = this.decorate(c[this.result.to])) : (this.options.decorate_both ? (b = this.decorate(this._prettify(this.result.from), this.result.from),
                        b += this.options.values_separator,
                        b += this.decorate(this._prettify(this.result.to), this.result.to)) : b = this.decorate(this._prettify(this.result.from) + this.options.values_separator + this._prettify(this.result.to), this.result.to),
                        f = this.decorate(this._prettify(this.result.from), this.result.from),
                        c = this.decorate(this._prettify(this.result.to), this.result.to));
                        this.$cache.single.html(b);
                        this.$cache.from.html(f);
                        this.$cache.to.html(c);
                        this.calcLabels();
                        c = Math.min(this.labels.p_single_left, this.labels.p_from_left);
                        b = this.labels.p_single_left + this.labels.p_single_fake;
                        f = this.labels.p_to_left + this.labels.p_to_fake;
                        var d = Math.max(b, f);
                        this.labels.p_from_left + this.labels.p_from_fake >= this.labels.p_to_left ? (this.$cache.from[0].style.visibility = "hidden",
                        this.$cache.to[0].style.visibility = "hidden",
                        this.$cache.single[0].style.visibility = "visible",
                        this.result.from === this.result.to ? ("from" === this.target ? this.$cache.from[0].style.visibility = "visible" : "to" === this.target ? this.$cache.to[0].style.visibility = "visible" : this.target || (this.$cache.from[0].style.visibility = "visible"),
                        this.$cache.single[0].style.visibility = "hidden",
                        d = f) : (this.$cache.from[0].style.visibility = "hidden",
                        this.$cache.to[0].style.visibility = "hidden",
                        this.$cache.single[0].style.visibility = "visible",
                        d = Math.max(b, f))) : (this.$cache.from[0].style.visibility = "visible",
                        this.$cache.to[0].style.visibility = "visible",
                        this.$cache.single[0].style.visibility = "hidden");
                        this.$cache.min[0].style.visibility = c < this.labels.p_min + 1 ? "hidden" : "visible";
                        this.$cache.max[0].style.visibility = d > 100 - this.labels.p_max - 1 ? "hidden" : "visible"
                    }
            }
        },
        drawShadow: function() {
            var b = this.options
              , c = this.$cache
              , f = "number" === typeof b.from_min && !isNaN(b.from_min)
              , d = "number" === typeof b.from_max && !isNaN(b.from_max)
              , e = "number" === typeof b.to_min && !isNaN(b.to_min)
              , l = "number" === typeof b.to_max && !isNaN(b.to_max);
            "single" === b.type ? b.from_shadow && (f || d) ? (f = this.convertToPercent(f ? b.from_min : b.min),
            d = this.convertToPercent(d ? b.from_max : b.max) - f,
            f = this.toFixed(f - this.coords.p_handle / 100 * f),
            d = this.toFixed(d - this.coords.p_handle / 100 * d),
            f += this.coords.p_handle / 2,
            c.shad_single[0].style.display = "block",
            c.shad_single[0].style.left = f + "%",
            c.shad_single[0].style.width = d + "%") : c.shad_single[0].style.display = "none" : (b.from_shadow && (f || d) ? (f = this.convertToPercent(f ? b.from_min : b.min),
            d = this.convertToPercent(d ? b.from_max : b.max) - f,
            f = this.toFixed(f - this.coords.p_handle / 100 * f),
            d = this.toFixed(d - this.coords.p_handle / 100 * d),
            f += this.coords.p_handle / 2,
            c.shad_from[0].style.display = "block",
            c.shad_from[0].style.left = f + "%",
            c.shad_from[0].style.width = d + "%") : c.shad_from[0].style.display = "none",
            b.to_shadow && (e || l) ? (e = this.convertToPercent(e ? b.to_min : b.min),
            b = this.convertToPercent(l ? b.to_max : b.max) - e,
            e = this.toFixed(e - this.coords.p_handle / 100 * e),
            b = this.toFixed(b - this.coords.p_handle / 100 * b),
            e += this.coords.p_handle / 2,
            c.shad_to[0].style.display = "block",
            c.shad_to[0].style.left = e + "%",
            c.shad_to[0].style.width = b + "%") : c.shad_to[0].style.display = "none")
        },
        callOnStart: function() {
            if (this.options.onStart && "function" === typeof this.options.onStart)
                this.options.onStart(this.result)
        },
        callOnChange: function() {
            if (this.options.onChange && "function" === typeof this.options.onChange)
                this.options.onChange(this.result)
        },
        callOnFinish: function() {
            if (this.options.onFinish && "function" === typeof this.options.onFinish)
                this.options.onFinish(this.result)
        },
        callOnUpdate: function() {
            if (this.options.onUpdate && "function" === typeof this.options.onUpdate)
                this.options.onUpdate(this.result)
        },
        toggleInput: function() {
            this.$cache.input.toggleClass("irs-hidden-input")
        },
        convertToPercent: function(b, c) {
            var f = this.options.max - this.options.min;
            return f ? this.toFixed((c ? b : b - this.options.min) / (f / 100)) : (this.no_diapason = !0,
            0)
        },
        convertToValue: function(b) {
            var c = this.options.min, f = this.options.max, d = c.toString().split(".")[1], e = f.toString().split(".")[1], l, k, h = 0, n = 0;
            if (0 === b)
                return this.options.min;
            if (100 === b)
                return this.options.max;
            d && (h = l = d.length);
            e && (h = k = e.length);
            l && k && (h = l >= k ? l : k);
            0 > c && (n = Math.abs(c),
            c = +(c + n).toFixed(h),
            f = +(f + n).toFixed(h));
            b = (f - c) / 100 * b + c;
            (c = this.options.step.toString().split(".")[1]) ? b = +b.toFixed(c.length) : (b /= this.options.step,
            b *= this.options.step,
            b = +b.toFixed(0));
            n && (b -= n);
            n = c ? +b.toFixed(c.length) : this.toFixed(b);
            n < this.options.min ? n = this.options.min : n > this.options.max && (n = this.options.max);
            return n
        },
        calcWithStep: function(b) {
            var c = Math.round(b / this.coords.p_step) * this.coords.p_step;
            100 < c && (c = 100);
            100 === b && (c = 100);
            return this.toFixed(c)
        },
        checkMinInterval: function(b, c, f) {
            var d = this.options;
            if (!d.min_interval)
                return b;
            b = this.convertToValue(b);
            c = this.convertToValue(c);
            "from" === f ? c - b < d.min_interval && (b = c - d.min_interval) : b - c < d.min_interval && (b = c + d.min_interval);
            return this.convertToPercent(b)
        },
        checkMaxInterval: function(b, c, f) {
            var d = this.options;
            if (!d.max_interval)
                return b;
            b = this.convertToValue(b);
            c = this.convertToValue(c);
            "from" === f ? c - b > d.max_interval && (b = c - d.max_interval) : b - c > d.max_interval && (b = c + d.max_interval);
            return this.convertToPercent(b)
        },
        checkDiapason: function(b, c, f) {
            b = this.convertToValue(b);
            var d = this.options;
            "number" !== typeof c && (c = d.min);
            "number" !== typeof f && (f = d.max);
            b < c && (b = c);
            b > f && (b = f);
            return this.convertToPercent(b)
        },
        toFixed: function(b) {
            b = b.toFixed(9);
            return +b
        },
        _prettify: function(b) {
            return this.options.prettify_enabled ? this.options.prettify && "function" === typeof this.options.prettify ? this.options.prettify(b) : this.prettify(b) : b
        },
        prettify: function(b) {
            return b.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + this.options.prettify_separator)
        },
        checkEdges: function(b, c) {
            if (!this.options.force_edges)
                return this.toFixed(b);
            0 > b ? b = 0 : b > 100 - c && (b = 100 - c);
            return this.toFixed(b)
        },
        validate: function() {
            var b = this.options, c = this.result, f = b.values, d = f.length, e, l;
            "string" === typeof b.min && (b.min = +b.min);
            "string" === typeof b.max && (b.max = +b.max);
            "string" === typeof b.from && (b.from = +b.from);
            "string" === typeof b.to && (b.to = +b.to);
            "string" === typeof b.step && (b.step = +b.step);
            "string" === typeof b.from_min && (b.from_min = +b.from_min);
            "string" === typeof b.from_max && (b.from_max = +b.from_max);
            "string" === typeof b.to_min && (b.to_min = +b.to_min);
            "string" === typeof b.to_max && (b.to_max = +b.to_max);
            "string" === typeof b.keyboard_step && (b.keyboard_step = +b.keyboard_step);
            "string" === typeof b.grid_num && (b.grid_num = +b.grid_num);
            b.max < b.min && (b.max = b.min);
            if (d)
                for (b.p_values = [],
                b.min = 0,
                b.max = d - 1,
                b.step = 1,
                b.grid_num = b.max,
                b.grid_snap = !0,
                l = 0; l < d; l++)
                    e = +f[l],
                    isNaN(e) ? e = f[l] : (f[l] = e,
                    e = this._prettify(e)),
                    b.p_values.push(e);
            if ("number" !== typeof b.from || isNaN(b.from))
                b.from = b.min;
            if ("number" !== typeof b.to || isNaN(b.from))
                b.to = b.max;
            if ("single" === b.type)
                b.from < b.min && (b.from = b.min),
                b.from > b.max && (b.from = b.max);
            else {
                if (b.from < b.min || b.from > b.max)
                    b.from = b.min;
                if (b.to > b.max || b.to < b.min)
                    b.to = b.max;
                b.from > b.to && (b.from = b.to)
            }
            if ("number" !== typeof b.step || isNaN(b.step) || !b.step || 0 > b.step)
                b.step = 1;
            if ("number" !== typeof b.keyboard_step || isNaN(b.keyboard_step) || !b.keyboard_step || 0 > b.keyboard_step)
                b.keyboard_step = 5;
            "number" === typeof b.from_min && b.from < b.from_min && (b.from = b.from_min);
            "number" === typeof b.from_max && b.from > b.from_max && (b.from = b.from_max);
            "number" === typeof b.to_min && b.to < b.to_min && (b.to = b.to_min);
            "number" === typeof b.to_max && b.from > b.to_max && (b.to = b.to_max);
            if (c) {
                c.min !== b.min && (c.min = b.min);
                c.max !== b.max && (c.max = b.max);
                if (c.from < c.min || c.from > c.max)
                    c.from = b.from;
                if (c.to < c.min || c.to > c.max)
                    c.to = b.to
            }
            if ("number" !== typeof b.min_interval || isNaN(b.min_interval) || !b.min_interval || 0 > b.min_interval)
                b.min_interval = 0;
            if ("number" !== typeof b.max_interval || isNaN(b.max_interval) || !b.max_interval || 0 > b.max_interval)
                b.max_interval = 0;
            b.min_interval && b.min_interval > b.max - b.min && (b.min_interval = b.max - b.min);
            b.max_interval && b.max_interval > b.max - b.min && (b.max_interval = b.max - b.min)
        },
        decorate: function(b, c) {
            var f = ""
              , d = this.options;
            d.prefix && (f += d.prefix);
            f += b;
            d.max_postfix && (d.values.length && b === d.p_values[d.max] ? (f += d.max_postfix,
            d.postfix && (f += " ")) : c === d.max && (f += d.max_postfix,
            d.postfix && (f += " ")));
            d.postfix && (f += d.postfix);
            return f
        },
        updateFrom: function() {
            this.result.from = this.options.from;
            this.result.from_percent = this.convertToPercent(this.result.from);
            this.options.values && (this.result.from_value = this.options.values[this.result.from])
        },
        updateTo: function() {
            this.result.to = this.options.to;
            this.result.to_percent = this.convertToPercent(this.result.to);
            this.options.values && (this.result.to_value = this.options.values[this.result.to])
        },
        updateResult: function() {
            this.result.min = this.options.min;
            this.result.max = this.options.max;
            this.updateFrom();
            this.updateTo()
        },
        appendGrid: function() {
            if (this.options.grid) {
                var b = this.options, c, f;
                c = b.max - b.min;
                var d = b.grid_num, e = 0, l, k = 4, h, n, m, L = "";
                this.calcGridMargin();
                b.grid_snap ? (d = c / b.step,
                e = this.toFixed(b.step / (c / 100))) : e = this.toFixed(100 / d);
                4 < d && (k = 3);
                7 < d && (k = 2);
                14 < d && (k = 1);
                28 < d && (k = 0);
                for (c = 0; c < d + 1; c++) {
                    h = k;
                    l = this.toFixed(e * c);
                    100 < l && (l = 100,
                    h -= 2,
                    0 > h && (h = 0));
                    this.coords.big[c] = l;
                    n = (l - e * (c - 1)) / (h + 1);
                    for (f = 1; f <= h && 0 !== l; f++)
                        m = this.toFixed(l - n * f),
                        L += '<span class="irs-grid-pol small" style="left: ' + m + '%"></span>';
                    L += '<span class="irs-grid-pol" style="left: ' + l + '%"></span>';
                    m = this.convertToValue(l);
                    m = b.values.length ? b.p_values[m] : this._prettify(m);
                    L += '<span class="irs-grid-text js-grid-text-' + c + '" style="left: ' + l + '%">' + m + "</span>"
                }
                this.coords.big_num = Math.ceil(d + 1);
                this.$cache.cont.addClass("irs-with-grid");
                this.$cache.grid.html(L);
                this.cacheGridLabels()
            }
        },
        cacheGridLabels: function() {
            var b, c, f = this.coords.big_num;
            for (c = 0; c < f; c++)
                b = this.$cache.grid.find(".js-grid-text-" + c),
                this.$cache.grid_labels.push(b);
            this.calcGridLabels()
        },
        calcGridLabels: function() {
            var b, c;
            c = [];
            var f = []
              , d = this.coords.big_num;
            for (b = 0; b < d; b++)
                this.coords.big_w[b] = this.$cache.grid_labels[b].outerWidth(!1),
                this.coords.big_p[b] = this.toFixed(this.coords.big_w[b] / this.coords.w_rs * 100),
                this.coords.big_x[b] = this.toFixed(this.coords.big_p[b] / 2),
                c[b] = this.toFixed(this.coords.big[b] - this.coords.big_x[b]),
                f[b] = this.toFixed(c[b] + this.coords.big_p[b]);
            this.options.force_edges && (c[0] < -this.coords.grid_gap && (c[0] = -this.coords.grid_gap,
            f[0] = this.toFixed(c[0] + this.coords.big_p[0]),
            this.coords.big_x[0] = this.coords.grid_gap),
            f[d - 1] > 100 + this.coords.grid_gap && (f[d - 1] = 100 + this.coords.grid_gap,
            c[d - 1] = this.toFixed(f[d - 1] - this.coords.big_p[d - 1]),
            this.coords.big_x[d - 1] = this.toFixed(this.coords.big_p[d - 1] - this.coords.grid_gap)));
            this.calcGridCollision(2, c, f);
            this.calcGridCollision(4, c, f);
            for (b = 0; b < d; b++)
                c = this.$cache.grid_labels[b][0],
                c.style.marginLeft = -this.coords.big_x[b] + "%"
        },
        calcGridCollision: function(b, c, f) {
            var d, e, l, k = this.coords.big_num;
            for (d = 0; d < k; d += b) {
                e = d + b / 2;
                if (e >= k)
                    break;
                l = this.$cache.grid_labels[e][0];
                l.style.visibility = f[d] <= c[e] ? "visible" : "hidden"
            }
        },
        calcGridMargin: function() {
            this.options.grid_margin && (this.coords.w_rs = this.$cache.rs.outerWidth(!1),
            this.coords.w_rs && (this.coords.w_handle = "single" === this.options.type ? this.$cache.s_single.outerWidth(!1) : this.$cache.s_from.outerWidth(!1),
            this.coords.p_handle = this.toFixed(this.coords.w_handle / this.coords.w_rs * 100),
            this.coords.grid_gap = this.toFixed(this.coords.p_handle / 2 - .1),
            this.$cache.grid[0].style.width = this.toFixed(100 - this.coords.p_handle) + "%",
            this.$cache.grid[0].style.left = this.coords.grid_gap + "%"))
        },
        update: function(b) {
            this.input && (this.is_update = !0,
            this.options.from = this.result.from,
            this.options.to = this.result.to,
            this.options = c.extend(this.options, b),
            this.validate(),
            this.updateResult(b),
            this.toggleInput(),
            this.remove(),
            this.init(!0))
        },
        reset: function() {
            this.input && (this.updateResult(),
            this.update())
        },
        destroy: function() {
            this.input && (this.toggleInput(),
            this.$cache.input.prop("readonly", !1),
            c.data(this.input, "ionRangeSlider", null ),
            this.remove(),
            this.options = this.input = null )
        }
    };
    c.fn.ionRangeSlider = function(b) {
        return this.each(function() {
            c.data(this, "ionRangeSlider") || c.data(this, "ionRangeSlider", new m(this,b,n++))
        })
    }
    ;
    (function() {
        for (var b = 0, c = ["ms", "moz", "webkit", "o"], f = 0; f < c.length && !k.requestAnimationFrame; ++f)
            k.requestAnimationFrame = k[c[f] + "RequestAnimationFrame"],
            k.cancelAnimationFrame = k[c[f] + "CancelAnimationFrame"] || k[c[f] + "CancelRequestAnimationFrame"];
        k.requestAnimationFrame || (k.requestAnimationFrame = function(d, c) {
            var f = (new Date).getTime()
              , e = Math.max(0, 16 - (f - b))
              , l = k.setTimeout(function() {
                d(f + e)
            }, e);
            b = f + e;
            return l
        }
        );
        k.cancelAnimationFrame || (k.cancelAnimationFrame = function(b) {
            clearTimeout(b)
        }
        )
    })()
});
(function(c) {
    c.fn.customScrollbar = function(b, k) {
        var h = {
            skin: void 0,
            hScroll: !0,
            vScroll: !0,
            updateOnWindowResize: !1,
            animationSpeed: 300,
            onCustomScroll: void 0,
            swipeSpeed: 1,
            wheelSpeed: 40,
            fixedThumbWidth: void 0,
            fixedThumbHeight: void 0,
            preventDefaultScroll: !1
        }
          , e = function(b, e) {
            this.$element = c(b);
            this.options = e;
            this.addScrollableClass();
            this.addSkinClass();
            this.addScrollBarComponents();
            this.options.vScroll && (this.vScrollbar = new n(this,new m));
            this.options.hScroll && (this.hScrollbar = new n(this,new l));
            this.$element.data("scrollable", this);
            this.initKeyboardScrolling();
            this.bindEvents()
        };
        e.prototype = {
            addScrollableClass: function() {
                this.$element.hasClass("scrollable") || (this.scrollableAdded = !0,
                this.$element.addClass("scrollable"))
            },
            removeScrollableClass: function() {
                this.scrollableAdded && this.$element.removeClass("scrollable")
            },
            addSkinClass: function() {
                "string" != typeof this.options.skin || this.$element.hasClass(this.options.skin) || (this.skinClassAdded = !0,
                this.$element.addClass(this.options.skin))
            },
            removeSkinClass: function() {
                this.skinClassAdded && this.$element.removeClass(this.options.skin)
            },
            addScrollBarComponents: function() {
                this.assignViewPort();
                0 == this.$viewPort.length && (this.$element.wrapInner('<div class="viewport" />'),
                this.assignViewPort(),
                this.viewPortAdded = !0);
                this.assignOverview();
                0 == this.$overview.length && (this.$viewPort.wrapInner('<div class="overview" />'),
                this.assignOverview(),
                this.overviewAdded = !0);
                this.addScrollBar("vertical", "prepend");
                this.addScrollBar("horizontal", "append")
            },
            removeScrollbarComponents: function() {
                this.removeScrollbar("vertical");
                this.removeScrollbar("horizontal");
                this.overviewAdded && this.$element.unwrap();
                this.viewPortAdded && this.$element.unwrap()
            },
            removeScrollbar: function(b) {
                this[b + "ScrollbarAdded"] && this.$element.find(".scroll-bar." + b).remove()
            },
            assignViewPort: function() {
                this.$viewPort = this.$element.find(".viewport")
            },
            assignOverview: function() {
                this.$overview = this.$viewPort.find(".overview")
            },
            addScrollBar: function(b, c) {
                0 == this.$element.find(".scroll-bar." + b).length && (this.$element[c]("<div class='scroll-bar " + b + "'><div class='thumb'></div></div>"),
                this[b + "ScrollbarAdded"] = !0)
            },
            resize: function(b) {
                this.vScrollbar && this.vScrollbar.resize(b);
                this.hScrollbar && this.hScrollbar.resize(b)
            },
            scrollTo: function(b) {
                this.vScrollbar && this.vScrollbar.scrollToElement(b);
                this.hScrollbar && this.hScrollbar.scrollToElement(b)
            },
            scrollToXY: function(b, c) {
                this.scrollToX(b);
                this.scrollToY(c)
            },
            scrollToX: function(b) {
                this.hScrollbar && this.hScrollbar.scrollOverviewTo(b, !0)
            },
            scrollToY: function(b) {
                this.vScrollbar && this.vScrollbar.scrollOverviewTo(b, !0)
            },
            scrollByX: function(b) {
                this.hScrollbar && this.scrollToX(this.hScrollbar.overviewPosition() + b)
            },
            scrollByY: function(b) {
                this.vScrollbar && this.scrollToY(this.vScrollbar.overviewPosition() + b)
            },
            remove: function() {
                this.removeScrollableClass();
                this.removeSkinClass();
                this.removeScrollbarComponents();
                this.$element.data("scrollable", null );
                this.removeKeyboardScrolling();
                this.vScrollbar && this.vScrollbar.remove();
                this.hScrollbar && this.hScrollbar.remove()
            },
            setAnimationSpeed: function(b) {
                this.options.animationSpeed = b
            },
            isInside: function(b, e) {
                var f = c(b)
                  , d = c(e)
                  , l = f.offset()
                  , k = d.offset();
                return l.top >= k.top && l.left >= k.left && l.top + f.height() <= k.top + d.height() && l.left + f.width() <= k.left + d.width()
            },
            initKeyboardScrolling: function() {
                var b = this;
                this.elementKeydown = function(c) {
                    document.activeElement === b.$element[0] && (b.vScrollbar && b.vScrollbar.keyScroll(c),
                    b.hScrollbar && b.hScrollbar.keyScroll(c))
                }
                ;
                this.$element.attr("tabindex", "-1").keydown(this.elementKeydown)
            },
            removeKeyboardScrolling: function() {
                this.$element.removeAttr("tabindex").unbind("keydown", this.elementKeydown)
            },
            bindEvents: function() {
                if (this.options.onCustomScroll)
                    this.$element.on("customScroll", this.options.onCustomScroll)
            }
        };
        var n = function(b, c) {
            this.scrollable = b;
            this.sizing = c;
            this.$scrollBar = this.sizing.scrollBar(this.scrollable.$element);
            this.$thumb = this.$scrollBar.find(".thumb");
            this.setScrollPosition(0, 0);
            this.resize();
            this.initMouseMoveScrolling();
            this.initMouseWheelScrolling();
            this.initTouchScrolling();
            this.initMouseClickScrolling();
            this.initWindowResize()
        };
        n.prototype = {
            resize: function(b) {
                this.overviewSize = this.sizing.size(this.scrollable.$overview);
                this.calculateViewPortSize();
                this.sizing.size(this.scrollable.$viewPort, this.viewPortSize);
                this.ratio = this.viewPortSize / this.overviewSize;
                this.sizing.size(this.$scrollBar, this.viewPortSize);
                this.thumbSize = this.calculateThumbSize();
                this.sizing.size(this.$thumb, this.thumbSize);
                this.maxThumbPosition = this.calculateMaxThumbPosition();
                this.maxOverviewPosition = this.calculateMaxOverviewPosition();
                this.enabled = this.overviewSize > this.viewPortSize;
                void 0 === this.scrollPercent && (this.scrollPercent = 0);
                this.enabled ? this.rescroll(b) : this.setScrollPosition(0, 0);
                this.$scrollBar.toggle(this.enabled)
            },
            calculateViewPortSize: function() {
                var b = this.sizing.size(this.scrollable.$element);
                0 < b && !this.maxSizeUsed ? (this.viewPortSize = b,
                this.maxSizeUsed = !1) : (b = this.sizing.maxSize(this.scrollable.$element),
                this.viewPortSize = Math.min(b, this.overviewSize),
                this.maxSizeUsed = !0)
            },
            calculateThumbSize: function() {
                var b = this.sizing.fixedThumbSize(this.scrollable.options);
                return Math.max(b ? b : this.ratio * this.viewPortSize, this.sizing.minSize(this.$thumb))
            },
            initMouseMoveScrolling: function() {
                var b = this;
                this.$thumb.mousedown(function(c) {
                    b.enabled && b.startMouseMoveScrolling(c)
                });
                this.documentMouseup = function(c) {
                    b.stopMouseMoveScrolling(c)
                }
                ;
                c(document).mouseup(this.documentMouseup);
                this.documentMousemove = function(c) {
                    b.mouseMoveScroll(c)
                }
                ;
                c(document).mousemove(this.documentMousemove);
                this.$thumb.click(function(b) {
                    b.stopPropagation()
                })
            },
            removeMouseMoveScrolling: function() {
                this.$thumb.unbind();
                c(document).unbind("mouseup", this.documentMouseup);
                c(document).unbind("mousemove", this.documentMousemove)
            },
            initMouseWheelScrolling: function() {
                var b = this;
                this.scrollable.$element.mousewheel(function(c, f, d, e) {
                    b.enabled && (f = b.mouseWheelScroll(d, e),
                    b.stopEventConditionally(c, f))
                })
            },
            removeMouseWheelScrolling: function() {
                this.scrollable.$element.unbind("mousewheel")
            },
            initTouchScrolling: function() {
                if (document.addEventListener) {
                    var b = this;
                    this.elementTouchstart = function(c) {
                        b.enabled && b.startTouchScrolling(c)
                    }
                    ;
                    this.scrollable.$element[0].addEventListener("touchstart", this.elementTouchstart);
                    this.documentTouchmove = function(c) {
                        b.touchScroll(c)
                    }
                    ;
                    this.scrollable.$element[0].addEventListener("touchmove", this.documentTouchmove);
                    this.elementTouchend = function(c) {
                        b.stopTouchScrolling(c)
                    }
                    ;
                    this.scrollable.$element[0].addEventListener("touchend", this.elementTouchend)
                }
            },
            removeTouchScrolling: function() {
                document.addEventListener && (this.scrollable.$element[0].removeEventListener("touchstart", this.elementTouchstart),
                document.removeEventListener("touchmove", this.documentTouchmove),
                this.scrollable.$element[0].removeEventListener("touchend", this.elementTouchend))
            },
            initMouseClickScrolling: function() {
                var b = this;
                this.scrollBarClick = function(c) {
                    b.mouseClickScroll(c)
                }
                ;
                this.$scrollBar.click(this.scrollBarClick)
            },
            removeMouseClickScrolling: function() {
                this.$scrollBar.unbind("click", this.scrollBarClick)
            },
            initWindowResize: function() {
                if (this.scrollable.options.updateOnWindowResize) {
                    var b = this;
                    this.windowResize = function() {
                        b.resize()
                    }
                    ;
                    c(window).resize(this.windowResize)
                }
            },
            removeWindowResize: function() {
                c(window).unbind("resize", this.windowResize)
            },
            isKeyScrolling: function(b) {
                return null != this.keyScrollDelta(b)
            },
            keyScrollDelta: function(b) {
                for (var c in this.sizing.scrollingKeys)
                    if (c == b)
                        return this.sizing.scrollingKeys[b](this.viewPortSize);
                return null
            },
            startMouseMoveScrolling: function(b) {
                this.mouseMoveScrolling = !0;
                c("body").addClass("not-selectable");
                this.setUnselectable(c("body"), "on");
                this.setScrollEvent(b);
                b.preventDefault()
            },
            stopMouseMoveScrolling: function(b) {
                this.mouseMoveScrolling = !1;
                c("body").removeClass("not-selectable");
                this.setUnselectable(c("body"), null )
            },
            setUnselectable: function(b, c) {
                b.attr("unselectable") != c && (b.attr("unselectable", c),
                b.find(":not(input)").attr("unselectable", c))
            },
            mouseMoveScroll: function(b) {
                if (this.mouseMoveScrolling) {
                    var c = this.sizing.mouseDelta(this.scrollEvent, b);
                    this.scrollThumbBy(c);
                    this.setScrollEvent(b)
                }
            },
            startTouchScrolling: function(b) {
                b.touches && 1 == b.touches.length && (this.setScrollEvent(b.touches[0]),
                this.touchScrolling = !0,
                b.stopPropagation())
            },
            touchScroll: function(b) {
                if (this.touchScrolling && b.touches && 1 == b.touches.length) {
                    var c = -this.sizing.mouseDelta(this.scrollEvent, b.touches[0]) * this.scrollable.options.swipeSpeed;
                    (c = this.scrollOverviewBy(c)) && this.setScrollEvent(b.touches[0]);
                    this.stopEventConditionally(b, c)
                }
            },
            stopTouchScrolling: function(b) {
                this.touchScrolling = !1;
                b.stopPropagation()
            },
            mouseWheelScroll: function(b, c) {
                var f = -this.sizing.wheelDelta(b, c) * this.scrollable.options.wheelSpeed;
                if (0 != f)
                    return this.scrollOverviewBy(f)
            },
            mouseClickScroll: function(b) {
                var c = this.viewPortSize - 20;
                b["page" + this.sizing.scrollAxis()] < this.$thumb.offset()[this.sizing.offsetComponent()] && (c = -c);
                this.scrollOverviewBy(c)
            },
            keyScroll: function(b) {
                var c = b.which;
                this.enabled && this.isKeyScrolling(c) && (c = this.scrollOverviewBy(this.keyScrollDelta(c)),
                this.stopEventConditionally(b, c))
            },
            scrollThumbBy: function(b) {
                var c = this.thumbPosition()
                  , c = this.positionOrMax(c + b, this.maxThumbPosition);
                b = this.scrollPercent;
                this.scrollPercent = c / this.maxThumbPosition;
                return b != this.scrollPercent ? (this.setScrollPosition(c * this.maxOverviewPosition / this.maxThumbPosition, c),
                this.triggerCustomScroll(b),
                !0) : !1
            },
            thumbPosition: function() {
                return this.$thumb.position()[this.sizing.offsetComponent()]
            },
            scrollOverviewBy: function(b) {
                b = this.overviewPosition() + b;
                return this.scrollOverviewTo(b, !1)
            },
            overviewPosition: function() {
                return -this.scrollable.$overview.position()[this.sizing.offsetComponent()]
            },
            scrollOverviewTo: function(b, c) {
                b = this.positionOrMax(b, this.maxOverviewPosition);
                var f = this.scrollPercent;
                this.scrollPercent = b / this.maxOverviewPosition;
                if (f != this.scrollPercent) {
                    var d = this.scrollPercent * this.maxThumbPosition;
                    c ? this.setScrollPositionWithAnimation(b, d) : this.setScrollPosition(b, d);
                    this.triggerCustomScroll(f);
                    return !0
                }
                return !1
            },
            positionOrMax: function(b, c) {
                return 0 > b ? 0 : b > c ? c : b
            },
            triggerCustomScroll: function(b) {
                this.scrollable.$element.trigger("customScroll", {
                    scrollAxis: this.sizing.scrollAxis(),
                    direction: this.sizing.scrollDirection(b, this.scrollPercent),
                    scrollPercent: 100 * this.scrollPercent
                })
            },
            rescroll: function(b) {
                if (b) {
                    b = this.positionOrMax(this.overviewPosition(), this.maxOverviewPosition);
                    this.scrollPercent = b / this.maxOverviewPosition;
                    var c = this.scrollPercent * this.maxThumbPosition
                } else
                    c = this.scrollPercent * this.maxThumbPosition,
                    b = this.scrollPercent * this.maxOverviewPosition;
                this.setScrollPosition(b, c)
            },
            setScrollPosition: function(b, c) {
                this.$thumb.css(this.sizing.offsetComponent(), c + "px");
                this.scrollable.$overview.css(this.sizing.offsetComponent(), -b + "px")
            },
            setScrollPositionWithAnimation: function(b, c) {
                var f = {}
                  , d = {};
                f[this.sizing.offsetComponent()] = c + "px";
                this.$thumb.animate(f, this.scrollable.options.animationSpeed);
                d[this.sizing.offsetComponent()] = -b + "px";
                this.scrollable.$overview.animate(d, this.scrollable.options.animationSpeed)
            },
            calculateMaxThumbPosition: function() {
                return Math.max(0, this.sizing.size(this.$scrollBar) - this.thumbSize)
            },
            calculateMaxOverviewPosition: function() {
                return Math.max(0, this.sizing.size(this.scrollable.$overview) - this.sizing.size(this.scrollable.$viewPort))
            },
            setScrollEvent: function(b) {
                var c = "page" + this.sizing.scrollAxis();
                this.scrollEvent && this.scrollEvent[c] == b[c] || (this.scrollEvent = {
                    pageX: b.pageX,
                    pageY: b.pageY
                })
            },
            scrollToElement: function(b) {
                b = c(b);
                if (this.sizing.isInside(b, this.scrollable.$overview) && !this.sizing.isInside(b, this.scrollable.$viewPort)) {
                    b = b.offset();
                    var e = this.scrollable.$overview.offset();
                    this.scrollable.$viewPort.offset();
                    this.scrollOverviewTo(b[this.sizing.offsetComponent()] - e[this.sizing.offsetComponent()], !0)
                }
            },
            remove: function() {
                this.removeMouseMoveScrolling();
                this.removeMouseWheelScrolling();
                this.removeTouchScrolling();
                this.removeMouseClickScrolling();
                this.removeWindowResize()
            },
            stopEventConditionally: function(b, c) {
                if (c || this.scrollable.options.preventDefaultScroll)
                    b.preventDefault(),
                    b.stopPropagation()
            }
        };
        var l = function() {};
        l.prototype = {
            size: function(b, c) {
                return c ? b.width(c) : b.width()
            },
            minSize: function(b) {
                return parseInt(b.css("min-width")) || 0
            },
            maxSize: function(b) {
                return parseInt(b.css("max-width")) || 0
            },
            fixedThumbSize: function(b) {
                return b.fixedThumbWidth
            },
            scrollBar: function(b) {
                return b.find(".scroll-bar.horizontal")
            },
            mouseDelta: function(b, c) {
                return c.pageX - b.pageX
            },
            offsetComponent: function() {
                return "left"
            },
            wheelDelta: function(b, c) {
                return b
            },
            scrollAxis: function() {
                return "X"
            },
            scrollDirection: function(b, c) {
                return b < c ? "right" : "left"
            },
            scrollingKeys: {
                37: function(b) {
                    return -10
                },
                39: function(b) {
                    return 10
                }
            },
            isInside: function(b, e) {
                var f = c(b)
                  , d = c(e)
                  , l = f.offset()
                  , k = d.offset();
                return l.left >= k.left && l.left + f.width() <= k.left + d.width()
            }
        };
        var m = function() {};
        m.prototype = {
            size: function(b, c) {
                return c ? b.height(c) : b.height()
            },
            minSize: function(b) {
                return parseInt(b.css("min-height")) || 0
            },
            maxSize: function(b) {
                return parseInt(b.css("max-height")) || 0
            },
            fixedThumbSize: function(b) {
                return b.fixedThumbHeight
            },
            scrollBar: function(b) {
                return b.find(".scroll-bar.vertical")
            },
            mouseDelta: function(b, c) {
                return c.pageY - b.pageY
            },
            offsetComponent: function() {
                return "top"
            },
            wheelDelta: function(b, c) {
                return c
            },
            scrollAxis: function() {
                return "Y"
            },
            scrollDirection: function(b, c) {
                return b < c ? "down" : "up"
            },
            scrollingKeys: {
                38: function(b) {
                    return -10
                },
                40: function(b) {
                    return 10
                },
                33: function(b) {
                    return -(b - 20)
                },
                34: function(b) {
                    return b - 20
                }
            },
            isInside: function(b, e) {
                var f = c(b)
                  , d = c(e)
                  , l = f.offset()
                  , k = d.offset();
                return l.top >= k.top && l.top + f.height() <= k.top + d.height()
            }
        };
        return this.each(function() {
            void 0 == b && (b = h);
            if ("string" == typeof b) {
                var l = c(this).data("scrollable");
                if (l)
                    l[b](k)
            } else if ("object" == typeof b)
                b = c.extend(h, b),
                new e(c(this),b);
            else
                throw "Invalid type of options";
        })
    }
})(jQuery);
(function(c) {
    function b(b) {
        var k = b || window.event, l = [].slice.call(arguments, 1), h = 0, g = 0, p;
        b = c.event.fix(k);
        b.type = "mousewheel";
        k.wheelDelta && (h = k.wheelDelta / 120);
        k.detail && (h = -k.detail / 3);
        p = h;
        void 0 !== k.axis && k.axis === k.HORIZONTAL_AXIS && (p = 0,
        g = h);
        void 0 !== k.wheelDeltaY && (p = k.wheelDeltaY / 120);
        void 0 !== k.wheelDeltaX && (g = k.wheelDeltaX / 120);
        l.unshift(b, h, g, p);
        return (c.event.dispatch || c.event.handle).apply(this, l)
    }
    var k = ["DOMMouseScroll", "mousewheel"];
    if (c.event.fixHooks)
        for (var h = k.length; h; )
            c.event.fixHooks[k[--h]] = c.event.mouseHooks;
    c.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var c = k.length; c; )
                    this.addEventListener(k[--c], b, !1);
            else
                this.onmousewheel = b
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = k.length; c; )
                    this.removeEventListener(k[--c], b, !1);
            else
                this.onmousewheel = null
        }
    };
    c.fn.extend({
        mousewheel: function(b) {
            return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
        },
        unmousewheel: function(b) {
            return this.unbind("mousewheel", b)
        }
    })
})(jQuery);
!function(c) {
    "function" == typeof define && define.amd ? define(["jquery"], c) : "object" == typeof exports ? module.exports = c(require("jquery")) : c(jQuery)
}(function(c) {
    function b(b, l) {
        this.element = b;
        this.options = c.extend({}, e, l);
        this.init()
    }
    function k(b) {
        if (!c(b.target).parents().hasClass("jq-selectbox") && "OPTION" != b.target.nodeName && c("div.jq-selectbox.opened").length) {
            b = c("div.jq-selectbox.opened");
            var e = c("div.jq-selectbox__search input", b)
              , k = c("div.jq-selectbox__dropdown", b);
            b.find("select").data("_" + h).options.onSelectClosed.call(b);
            e.length && e.val("").keyup();
            k.hide().find("li.sel").addClass("selected");
            b.removeClass("focused opened dropup dropdown")
        }
    }
    var h = "styler"
      , e = {
        idSuffix: "-styler",
        filePlaceholder: "\u0424\u0430\u0439\u043b \u043d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d",
        fileBrowse: "\u041e\u0431\u0437\u043e\u0440...",
        fileNumber: "\u0412\u044b\u0431\u0440\u0430\u043d\u043e \u0444\u0430\u0439\u043b\u043e\u0432: %s",
        selectPlaceholder: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435...",
        selectSearch: !1,
        selectSearchLimit: 10,
        selectSearchNotFound: "\u0421\u043e\u0432\u043f\u0430\u0434\u0435\u043d\u0438\u0439 \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e",
        selectSearchPlaceholder: "\u041f\u043e\u0438\u0441\u043a...",
        selectVisibleOptions: 0,
        singleSelectzIndex: "100",
        selectSmartPositioning: !0,
        onSelectOpened: function() {},
        onSelectClosed: function() {},
        onFormStyled: function() {}
    };
    b.prototype = {
        init: function() {
            function b() {
                void 0 !== e.attr("id") && "" !== e.attr("id") && (this.id = e.attr("id") + h.idSuffix);
                this.title = e.attr("title");
                this.classes = e.attr("class");
                this.data = e.data()
            }
            var e = c(this.element)
              , h = this.options
              , g = !(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i) || navigator.userAgent.match(/(Windows\sPhone)/i))
              , p = !(!navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/(Windows\sPhone)/i));
            if (e.is(":checkbox")) {
                var f = function() {
                    var d = new b
                      , f = c('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({
                        id: d.id,
                        title: d.title
                    }).addClass(d.classes).data(d.data);
                    e.css({
                        position: "absolute",
                        zIndex: "-1",
                        opacity: 0,
                        margin: 0,
                        padding: 0
                    }).after(f).prependTo(f);
                    f.attr("unselectable", "on").css({
                        "-webkit-user-select": "none",
                        "-moz-user-select": "none",
                        "-ms-user-select": "none",
                        "-o-user-select": "none",
                        "user-select": "none",
                        display: "inline-block",
                        position: "relative",
                        overflow: "hidden"
                    });
                    e.is(":checked") && f.addClass("checked");
                    e.is(":disabled") && f.addClass("disabled");
                    f.click(function(b) {
                        b.preventDefault();
                        f.is(".disabled") || (e.is(":checked") ? (e.prop("checked", !1),
                        f.removeClass("checked")) : (e.prop("checked", !0),
                        f.addClass("checked")),
                        e.focus().change())
                    });
                    e.closest("label").add('label[for="' + e.attr("id") + '"]').on("click.styler", function(b) {
                        c(b.target).is("a") || c(b.target).closest(f).length || (f.triggerHandler("click"),
                        b.preventDefault())
                    });
                    e.on("change.styler", function() {
                        e.is(":checked") ? f.addClass("checked") : f.removeClass("checked")
                    }).on("keydown.styler", function(b) {
                        32 == b.which && f.click()
                    }).on("focus.styler", function() {
                        f.is(".disabled") || f.addClass("focused")
                    }).on("blur.styler", function() {
                        f.removeClass("focused")
                    })
                };
                f();
                e.on("refresh", function() {
                    e.closest("label").add('label[for="' + e.attr("id") + '"]').off(".styler");
                    e.off(".styler").parent().before(e).remove();
                    f()
                })
            } else if (e.is(":radio")) {
                var d = function() {
                    var d = new b
                      , f = c('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({
                        id: d.id,
                        title: d.title
                    }).addClass(d.classes).data(d.data);
                    e.css({
                        position: "absolute",
                        zIndex: "-1",
                        opacity: 0,
                        margin: 0,
                        padding: 0
                    }).after(f).prependTo(f);
                    f.attr("unselectable", "on").css({
                        "-webkit-user-select": "none",
                        "-moz-user-select": "none",
                        "-ms-user-select": "none",
                        "-o-user-select": "none",
                        "user-select": "none",
                        display: "inline-block",
                        position: "relative"
                    });
                    e.is(":checked") && f.addClass("checked");
                    e.is(":disabled") && f.addClass("disabled");
                    c.fn.commonParents = function() {
                        var b = this;
                        return b.first().parents().filter(function() {
                            return c(this).find(b).length === b.length
                        })
                    }
                    ;
                    c.fn.commonParent = function() {
                        return c(this).commonParents().first()
                    }
                    ;
                    f.click(function(b) {
                        (b.preventDefault(),
                        f.is(".disabled")) || (b = c('input[name="' + e.attr("name") + '"]'),
                        b.commonParent().find(b).prop("checked", !1).parent().removeClass("checked"),
                        e.prop("checked", !0).parent().addClass("checked"),
                        e.focus().change())
                    });
                    e.closest("label").add('label[for="' + e.attr("id") + '"]').on("click.styler", function(b) {
                        c(b.target).is("a") || c(b.target).closest(f).length || (f.triggerHandler("click"),
                        b.preventDefault())
                    });
                    e.on("change.styler", function() {
                        e.parent().addClass("checked")
                    }).on("focus.styler", function() {
                        f.is(".disabled") || f.addClass("focused")
                    }).on("blur.styler", function() {
                        f.removeClass("focused")
                    })
                };
                d();
                e.on("refresh", function() {
                    e.closest("label").add('label[for="' + e.attr("id") + '"]').off(".styler");
                    e.off(".styler").parent().before(e).remove();
                    d()
                })
            } else if (e.is(":file")) {
                e.css({
                    position: "absolute",
                    top: 0,
                    right: 0,
                    margin: 0,
                    padding: 0,
                    opacity: 0,
                    fontSize: "100px"
                });
                var q = function() {
                    var d = new b
                      , f = e.data("placeholder");
                    void 0 === f && (f = h.filePlaceholder);
                    var k = e.data("browse");
                    void 0 !== k && "" !== k || (k = h.fileBrowse);
                    var g = c('<div class="jq-file"><div class="jq-file__name">' + f + '</div><div class="jq-file__browse">' + k + "</div></div>").css({
                        display: "inline-block",
                        position: "relative",
                        overflow: "hidden"
                    }).attr({
                        id: d.id,
                        title: d.title
                    }).addClass(d.classes).data(d.data);
                    e.after(g).appendTo(g);
                    e.is(":disabled") && g.addClass("disabled");
                    e.on("change.styler", function() {
                        var b = e.val()
                          , d = c("div.jq-file__name", g);
                        if (e.is("[multiple]")) {
                            var b = ""
                              , k = e[0].files.length;
                            0 < k && (b = e.data("number"),
                            void 0 === b && (b = h.fileNumber),
                            b = b.replace("%s", k))
                        }
                        d.text(b.replace(/.+[\\\/]/, ""));
                        "" === b ? (d.text(f),
                        g.removeClass("changed")) : g.addClass("changed")
                    }).on("focus.styler", function() {
                        g.addClass("focused")
                    }).on("blur.styler", function() {
                        g.removeClass("focused")
                    }).on("click.styler", function() {
                        g.removeClass("focused")
                    })
                };
                q();
                e.on("refresh", function() {
                    e.off(".styler").parent().before(e).remove();
                    q()
                })
            } else if (e.is('input[type="number"]')) {
                var t = function() {
                    var d = new b
                      , f = c('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({
                        id: d.id,
                        title: d.title
                    }).addClass(d.classes).data(d.data);
                    e.after(f).prependTo(f).wrap('<div class="jq-number__field"></div>');
                    e.is(":disabled") && f.addClass("disabled");
                    var k, h, g, m = null , t = null ;
                    void 0 !== e.attr("min") && (k = e.attr("min"));
                    void 0 !== e.attr("max") && (h = e.attr("max"));
                    g = void 0 !== e.attr("step") && c.isNumeric(e.attr("step")) ? Number(e.attr("step")) : Number(1);
                    var p = function(b) {
                        var d, f = e.val();
                        c.isNumeric(f) || (f = 0,
                        e.val("0"));
                        b.is(".minus") ? d = Number(f) - g : b.is(".plus") && (d = Number(f) + g);
                        b = (g.toString().split(".")[1] || []).length;
                        if (0 < b) {
                            for (f = "1"; f.length <= b; )
                                f += "0";
                            d = Math.round(d * f) / f
                        }
                        c.isNumeric(k) && c.isNumeric(h) ? d >= k && h >= d && e.val(d) : c.isNumeric(k) && !c.isNumeric(h) ? d >= k && e.val(d) : !c.isNumeric(k) && c.isNumeric(h) ? h >= d && e.val(d) : e.val(d)
                    };
                    f.is(".disabled") || (f.on("mousedown", "div.jq-number__spin", function() {
                        var b = c(this);
                        p(b);
                        m = setTimeout(function() {
                            t = setInterval(function() {
                                p(b)
                            }, 40)
                        }, 350)
                    }).on("mouseup mouseout", "div.jq-number__spin", function() {
                        clearTimeout(m);
                        clearInterval(t)
                    }).on("mouseup", "div.jq-number__spin", function() {
                        e.change()
                    }),
                    e.on("focus.styler", function() {
                        f.addClass("focused")
                    }).on("blur.styler", function() {
                        f.removeClass("focused")
                    }))
                };
                t();
                e.on("refresh", function() {
                    e.off(".styler").closest(".jq-number").before(e).remove();
                    t()
                })
            } else if (e.is("select")) {
                var u = function() {
                    function d(b) {
                        b.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function(b) {
                            var d = null ;
                            "mousewheel" == b.type ? d = -1 * b.originalEvent.wheelDelta : "DOMMouseScroll" == b.type && (d = 40 * b.originalEvent.detail);
                            d && (b.stopPropagation(),
                            b.preventDefault(),
                            c(this).scrollTop(d + c(this).scrollTop()))
                        })
                    }
                    function f() {
                        for (var b = 0; b < u.length; b++) {
                            var d = u.eq(b), c, e = "", k = c = "", g = "", l = "", n = "", y = "", t = "";
                            d.prop("selected") && (e = "selected sel");
                            d.is(":disabled") && (e = "disabled");
                            d.is(":selected:disabled") && (e = "selected sel disabled");
                            void 0 !== d.attr("id") && "" !== d.attr("id") && (k = ' id="' + d.attr("id") + h.idSuffix + '"');
                            void 0 !== d.attr("title") && "" !== u.attr("title") && (g = ' title="' + d.attr("title") + '"');
                            void 0 !== d.attr("class") && (n = " " + d.attr("class"),
                            t = ' data-jqfs-class="' + d.attr("class") + '"');
                            var p = d.data(), q;
                            for (q in p)
                                "" !== p[q] && (l += " data-" + q + '="' + p[q] + '"');
                            "" !== e + n && (c = ' class="' + e + n + '"');
                            c = "<li" + t + l + c + g + k + ">" + d.html() + "</li>";
                            d.parent().is("optgroup") && (void 0 !== d.parent().attr("class") && (y = " " + d.parent().attr("class")),
                            c = "<li" + t + l + ' class="' + e + n + " option" + y + '"' + g + k + ">" + d.html() + "</li>",
                            d.is(":first-child") && (c = '<li class="optgroup' + y + '">' + d.parent().attr("label") + "</li>" + c));
                            ya += c
                        }
                    }
                    function t() {
                        var p = new b
                          , q = ""
                          , N = e.data("placeholder")
                          , L = e.data("search")
                          , J = e.data("search-limit")
                          , B = e.data("search-not-found")
                          , w = e.data("search-placeholder")
                          , D = e.data("z-index")
                          , H = e.data("smart-positioning");
                        void 0 === N && (N = h.selectPlaceholder);
                        void 0 !== L && "" !== L || (L = h.selectSearch);
                        void 0 !== J && "" !== J || (J = h.selectSearchLimit);
                        void 0 !== B && "" !== B || (B = h.selectSearchNotFound);
                        void 0 === w && (w = h.selectSearchPlaceholder);
                        void 0 !== D && "" !== D || (D = h.singleSelectzIndex);
                        void 0 !== H && "" !== H || (H = h.selectSmartPositioning);
                        var x = c('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select" style="position: relative"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').css({
                            display: "inline-block",
                            position: "relative",
                            zIndex: D
                        }).attr({
                            id: p.id,
                            title: p.title
                        }).addClass(p.classes).data(p.data);
                        e.css({
                            margin: 0,
                            padding: 0
                        }).after(x).prependTo(x);
                        var G = c("div.jq-selectbox__select", x)
                          , I = c("div.jq-selectbox__select-text", x)
                          , p = u.filter(":selected");
                        f();
                        L && (q = '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + w + '"></div><div class="jq-selectbox__not-found">' + B + "</div>");
                        var v = c('<div class="jq-selectbox__dropdown" style="position: absolute">' + q + '<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + ya + "</ul></div>");
                        x.append(v);
                        var E = c("ul", v)
                          , F = c("li", v)
                          , X = c("input", v)
                          , ea = c("div.jq-selectbox__not-found", v).hide();
                        F.length < J && X.parent().hide();
                        "" === u.first().text() && u.first().is(":selected") ? I.text(N).addClass("placeholder") : I.text(p.text());
                        var K = 0
                          , R = 0;
                        (F.css({
                            display: "inline-block"
                        }),
                        F.each(function() {
                            var b = c(this);
                            b.innerWidth() > K && (K = b.innerWidth(),
                            R = b.width())
                        }),
                        F.css({
                            display: ""
                        }),
                        I.is(".placeholder") && I.width() > K) ? I.width(I.width()) : (q = x.clone().appendTo("body").width("auto"),
                        L = q.outerWidth(),
                        q.remove(),
                        L == x.outerWidth() && I.width(R));
                        K > x.width() && v.width(K);
                        "" === u.first().text() && "" !== e.data("placeholder") && F.first().hide();
                        e.css({
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0
                        });
                        var fa = x.outerHeight(!0)
                          , aa = X.parent().outerHeight(!0)
                          , S = E.css("max-height")
                          , q = F.filter(".selected");
                        1 > q.length && F.first().addClass("selected sel");
                        void 0 === F.data("li-height") && F.data("li-height", F.outerHeight());
                        var O = v.css("top");
                        if ("auto" == v.css("left") && v.css({
                            left: 0
                        }),
                        "auto" == v.css("top") && (v.css({
                            top: fa
                        }),
                        O = fa),
                        v.hide(),
                        q.length && (u.first().text() != p.text() && x.addClass("changed"),
                        x.data("jqfs-class", q.data("jqfs-class")),
                        x.addClass(q.data("jqfs-class"))),
                        e.is(":disabled"))
                            return x.addClass("disabled"),
                            !1;
                        G.click(function() {
                            if (c("div.jq-selectbox").filter(".opened").length && h.onSelectClosed.call(c("div.jq-selectbox").filter(".opened")),
                            e.focus(),
                            !g) {
                                var b = c(window)
                                  , f = F.data("li-height")
                                  , k = x.offset().top
                                  , n = b.height() - fa - (k - b.scrollTop())
                                  , y = e.data("visible-options");
                                void 0 !== y && "" !== y || (y = h.selectVisibleOptions);
                                var t = 5 * f
                                  , p = f * y;
                                0 < y && 6 > y && (t = p);
                                0 === y && (p = "auto");
                                var y = function() {
                                    v.height("auto").css({
                                        bottom: "auto",
                                        top: O
                                    });
                                    var b = function() {
                                        E.css("max-height", Math.floor((n - 20 - aa) / f) * f)
                                    };
                                    b();
                                    E.css("max-height", p);
                                    "none" != S && E.css("max-height", S);
                                    n < v.outerHeight() + 20 && b()
                                }
                                  , q = function() {
                                    v.height("auto").css({
                                        top: "auto",
                                        bottom: O
                                    });
                                    var d = function() {
                                        E.css("max-height", Math.floor((k - b.scrollTop() - 20 - aa) / f) * f)
                                    };
                                    d();
                                    E.css("max-height", p);
                                    "none" != S && E.css("max-height", S);
                                    k - b.scrollTop() - 20 < v.outerHeight() + 20 && d()
                                };
                                !0 === H || 1 === H ? n > t + aa + 20 ? (y(),
                                x.removeClass("dropup").addClass("dropdown")) : (q(),
                                x.removeClass("dropdown").addClass("dropup")) : !1 !== H && 0 !== H || n > t + aa + 20 && (y(),
                                x.removeClass("dropup").addClass("dropdown"));
                                x.offset().left + v.outerWidth() > b.width() && v.css({
                                    left: "auto",
                                    right: 0
                                });
                                c("div.jqselect").css({
                                    zIndex: D - 1
                                }).removeClass("opened");
                                x.css({
                                    zIndex: D
                                });
                                v.is(":hidden") ? (c("div.jq-selectbox__dropdown:visible").hide(),
                                v.show(),
                                x.addClass("opened focused"),
                                h.onSelectOpened.call(x)) : (v.hide(),
                                x.removeClass("opened dropup dropdown"),
                                c("div.jq-selectbox").filter(".opened").length && h.onSelectClosed.call(x));
                                X.length && (X.val("").keyup(),
                                ea.hide(),
                                X.keyup(function() {
                                    var b = c(this).val();
                                    F.each(function() {
                                        c(this).html().match(new RegExp(".*?" + b + ".*?","i")) ? c(this).show() : c(this).hide()
                                    });
                                    "" === u.first().text() && "" !== e.data("placeholder") && F.first().hide();
                                    1 > F.filter(":visible").length ? ea.show() : ea.hide()
                                }));
                                F.filter(".selected").length && ("" === e.val() ? E.scrollTop(0) : (0 !== E.innerHeight() / f % 2 && (f /= 2),
                                E.scrollTop(E.scrollTop() + F.filter(".selected").position().top - E.innerHeight() / 2 + f)));
                                d(E)
                            }
                        });
                        F.hover(function() {
                            c(this).siblings().removeClass("selected")
                        });
                        F.filter(".selected").text();
                        F.filter(":not(.disabled):not(.optgroup)").click(function() {
                            e.focus();
                            var b = c(this)
                              , d = b.text();
                            if (!b.is(".selected")) {
                                var f = b.index()
                                  , f = f - b.prevAll(".optgroup").length;
                                b.addClass("selected sel").siblings().removeClass("selected sel");
                                u.prop("selected", !1).eq(f).prop("selected", !0);
                                I.text(d);
                                x.data("jqfs-class") && x.removeClass(x.data("jqfs-class"));
                                x.data("jqfs-class", b.data("jqfs-class"));
                                x.addClass(b.data("jqfs-class"));
                                e.change()
                            }
                            v.hide();
                            x.removeClass("opened dropup dropdown");
                            h.onSelectClosed.call(x)
                        });
                        v.mouseout(function() {
                            c("li.sel", v).addClass("selected")
                        });
                        e.on("change.styler", function() {
                            I.text(u.filter(":selected").text()).removeClass("placeholder");
                            F.removeClass("selected sel").not(".optgroup").eq(e[0].selectedIndex).addClass("selected sel");
                            u.first().text() != F.filter(".selected").text() ? x.addClass("changed") : x.removeClass("changed")
                        }).on("focus.styler", function() {
                            x.addClass("focused");
                            c("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()
                        }).on("blur.styler", function() {
                            x.removeClass("focused")
                        }).on("keydown.styler keyup.styler", function(b) {
                            var d = F.data("li-height");
                            "" === e.val() ? I.text(N).addClass("placeholder") : I.text(u.filter(":selected").text());
                            F.removeClass("selected sel").not(".optgroup").eq(e[0].selectedIndex).addClass("selected sel");
                            38 != b.which && 37 != b.which && 33 != b.which && 36 != b.which || ("" === e.val() ? E.scrollTop(0) : E.scrollTop(E.scrollTop() + F.filter(".selected").position().top));
                            40 != b.which && 39 != b.which && 34 != b.which && 35 != b.which || E.scrollTop(E.scrollTop() + F.filter(".selected").position().top - E.innerHeight() + d);
                            13 == b.which && (b.preventDefault(),
                            v.hide(),
                            x.removeClass("opened dropup dropdown"),
                            h.onSelectClosed.call(x))
                        }).on("keydown.styler", function(b) {
                            32 == b.which && (b.preventDefault(),
                            G.click())
                        });
                        k.registered || (c(document).on("click", k),
                        k.registered = !0)
                    }
                    function q() {
                        var k = new b
                          , h = c('<div class="jq-select-multiple jqselect"></div>').css({
                            display: "inline-block",
                            position: "relative"
                        }).attr({
                            id: k.id,
                            title: k.title
                        }).addClass(k.classes).data(k.data);
                        e.css({
                            margin: 0,
                            padding: 0
                        }).after(h);
                        f();
                        h.append("<ul>" + ya + "</ul>");
                        var g = c("ul", h).css({
                            position: "relative",
                            "overflow-x": "hidden",
                            "-webkit-overflow-scrolling": "touch"
                        })
                          , m = c("li", h).attr("unselectable", "on")
                          , k = e.attr("size")
                          , t = g.outerHeight()
                          , p = m.outerHeight();
                        void 0 !== k && 0 < k ? g.css({
                            height: p * k
                        }) : g.css({
                            height: 4 * p
                        });
                        t > h.height() && (g.css("overflowY", "scroll"),
                        d(g),
                        m.filter(".selected").length && g.scrollTop(g.scrollTop() + m.filter(".selected").position().top));
                        e.prependTo(h).css({
                            position: "absolute",
                            left: 0,
                            top: 0,
                            width: "100%",
                            height: "100%",
                            opacity: 0
                        });
                        e.is(":disabled") ? (h.addClass("disabled"),
                        u.each(function() {
                            c(this).is(":selected") && m.eq(c(this).index()).addClass("selected")
                        })) : (m.filter(":not(.disabled):not(.optgroup)").click(function(b) {
                            e.focus();
                            var d = c(this);
                            if (b.ctrlKey || b.metaKey || d.addClass("selected"),
                            b.shiftKey || d.addClass("first"),
                            b.ctrlKey || b.metaKey || b.shiftKey || d.siblings().removeClass("selected first"),
                            (b.ctrlKey || b.metaKey) && (d.is(".selected") ? d.removeClass("selected first") : d.addClass("selected first"),
                            d.siblings().removeClass("first")),
                            b.shiftKey) {
                                var f = !1
                                  , k = !1;
                                d.siblings().removeClass("selected").siblings(".first").addClass("selected");
                                d.prevAll().each(function() {
                                    c(this).is(".first") && (f = !0)
                                });
                                d.nextAll().each(function() {
                                    c(this).is(".first") && (k = !0)
                                });
                                f && d.prevAll().each(function() {
                                    return c(this).is(".selected") ? !1 : void c(this).not(".disabled, .optgroup").addClass("selected")
                                });
                                k && d.nextAll().each(function() {
                                    return c(this).is(".selected") ? !1 : void c(this).not(".disabled, .optgroup").addClass("selected")
                                });
                                1 == m.filter(".selected").length && d.addClass("first")
                            }
                            u.prop("selected", !1);
                            m.filter(".selected").each(function() {
                                var b = c(this)
                                  , d = b.index();
                                b.is(".option") && (d -= b.prevAll(".optgroup").length);
                                u.eq(d).prop("selected", !0)
                            });
                            e.change()
                        }),
                        u.each(function(b) {
                            c(this).data("optionIndex", b)
                        }),
                        e.on("change.styler", function() {
                            m.removeClass("selected");
                            var b = [];
                            u.filter(":selected").each(function() {
                                b.push(c(this).data("optionIndex"))
                            });
                            m.not(".optgroup").filter(function(d) {
                                return -1 < c.inArray(d, b)
                            }).addClass("selected")
                        }).on("focus.styler", function() {
                            h.addClass("focused")
                        }).on("blur.styler", function() {
                            h.removeClass("focused")
                        }),
                        t > h.height() && e.on("keydown.styler", function(b) {
                            38 != b.which && 37 != b.which && 33 != b.which || g.scrollTop(g.scrollTop() + m.filter(".selected").position().top - p);
                            40 != b.which && 39 != b.which && 34 != b.which || g.scrollTop(g.scrollTop() + m.filter(".selected:last").position().top - g.innerHeight() + 2 * p)
                        }))
                    }
                    var u = c("option", e)
                      , ya = "";
                    e.is("[multiple]") ? p || g || q() : t()
                };
                u();
                e.on("refresh", function() {
                    e.off(".styler").parent().before(e).remove();
                    u()
                })
            } else
                e.is(":reset") && e.on("click", function() {
                    setTimeout(function() {
                        e.closest("form").find("input, select").trigger("refresh")
                    }, 1)
                })
        },
        destroy: function() {
            var b = c(this.element);
            b.is(":checkbox") || b.is(":radio") ? (b.removeData("_" + h).off(".styler refresh").removeAttr("style").parent().before(b).remove(),
            b.closest("label").add('label[for="' + b.attr("id") + '"]').off(".styler")) : b.is('input[type="number"]') ? b.removeData("_" + h).off(".styler refresh").closest(".jq-number").before(b).remove() : (b.is(":file") || b.is("select")) && b.removeData("_" + h).off(".styler refresh").removeAttr("style").parent().before(b).remove()
        }
    };
    c.fn[h] = function(e) {
        var k = arguments;
        if (void 0 === e || "object" == typeof e)
            return this.each(function() {
                c.data(this, "_" + h) || c.data(this, "_" + h, new b(this,e))
            }).promise().done(function() {
                var b = c(this[0]).data("_" + h);
                b && b.options.onFormStyled.call()
            }),
            this;
        if ("string" == typeof e && "_" !== e[0] && "init" !== e) {
            var m;
            return this.each(function() {
                var g = c.data(this, "_" + h);
                g instanceof b && "function" == typeof g[e] && (m = g[e].apply(g, Array.prototype.slice.call(k, 1)))
            }),
            void 0 !== m ? m : this
        }
    }
    ;
    k.registered = !1
});
(function(c, b) {
    c.fn.popup = function(b) {
        var h = this.selector
          , e = new c.Popup(b);
        c(document).on("click.popup", h, function(h) {
            var l = b && b.content ? b.content : c(this).attr("href");
            h.preventDefault();
            e.open(l, void 0, this)
        });
        return this.each(function() {
            c(this).data("popup", e)
        })
    }
    ;
    c.Popup = function(k) {
        function h(b) {
            var d;
            c.each(b, function(b, c) {
                if (c)
                    return d = c,
                    !1
            });
            return d
        }
        function e(b) {
            return "function" === typeof b ? "function" : b instanceof c ? "jQuery" : "#" === b.substr(0, 1) || "." === b.substr(0, 1) ? "inline" : -1 !== c.inArray(b.substr(b.length - 3), g) ? "image" : "http" === b.substr(0, 4) ? "external" : "ajax"
        }
        function n(f) {
            t && t.fadeOut("fast", function() {
                c(this).remove()
            });
            var e = !0;
            void 0 === q && (e = !1,
            q = c('<div class="' + m.o.containerClass + '">'),
            u = c(m.o.markup).appendTo(q),
            c(m.o.closeContent).one("click", function() {
                m.close()
            }).appendTo(q),
            c(b).resize(m.center),
            q.appendTo(c("body")).css("opacity", 0));
            var k = c("." + m.o.contentClass, q);
            m.width ? k.css("width", m.width, 10) : k.css("width", "");
            m.height ? k.css("height", m.height, 10) : k.css("height", "");
            u.hasClass(m.o.contentClass) ? u.html(f) : u.find("." + m.o.contentClass).html(f);
            e ? m.o.replaced.call(m, q, d) : m.o.show.call(m, q, d)
        }
        function l(b, d) {
            var c = (new RegExp("[?&]" + b + "=([^&]*)")).exec(d);
            return c && decodeURIComponent(c[1].replace(/\+/g, " "))
        }
        var m = this, g = ["png", "jpg", "gif"], p, f, d, q, t, u;
        m.ele = void 0;
        m.o = c.extend(!0, {}, {
            backClass: "popup_back",
            backOpacity: .7,
            containerClass: "popup_cont",
            closeContent: '<div class="popup_close">&times;</div>',
            markup: '<div class="popup"><div class="popup_content"/></div>',
            contentClass: "popup_content",
            preloaderContent: '<p class="preloader">Loading</p>',
            activeClass: "popup_active",
            hideFlash: !1,
            speed: 200,
            popupPlaceholderClass: "popup_placeholder",
            keepInlineChanges: !0,
            modal: !1,
            content: null ,
            type: "auto",
            width: null ,
            height: null ,
            typeParam: "pt",
            widthParam: "pw",
            heightParam: "ph",
            beforeOpen: function(b) {},
            afterOpen: function() {},
            beforeClose: function() {},
            afterClose: function() {},
            error: function() {},
            show: function(b, d) {
                var c = this;
                c.center();
                b.animate({
                    opacity: 1
                }, c.o.speed, function() {
                    c.o.afterOpen.call(c)
                })
            },
            replaced: function(b, d) {
                this.center().o.afterOpen.call(this)
            },
            hide: function(b, d) {
                void 0 !== b && b.animate({
                    opacity: 0
                }, this.o.speed)
            },
            types: {
                inline: function(b, d) {
                    var e = c(b);
                    e.addClass(m.o.popupPlaceholderClass);
                    m.o.keepInlineChanges || (f = e.html());
                    d.call(this, e.children())
                },
                image: function(b, d) {
                    var f = this;
                    c("<img />").one("load", function() {
                        var b = this;
                        setTimeout(function() {
                            d.call(f, b)
                        }, 0)
                    }).one("error", function() {
                        m.o.error.call(m, b, "image")
                    }).attr("src", b).each(function() {
                        this.complete && c(this).trigger("load")
                    })
                },
                external: function(b, d) {
                    var f = c("<iframe />").attr({
                        src: b,
                        frameborder: 0,
                        width: m.width,
                        height: m.height
                    });
                    d.call(this, f)
                },
                html: function(b, d) {
                    d.call(this, b)
                },
                jQuery: function(b, d) {
                    d.call(this, b.html())
                },
                "function": function(b, d) {
                    d.call(this, b.call(m))
                },
                ajax: function(b, d) {
                    c.ajax({
                        url: b,
                        success: function(b) {
                            d.call(this, b)
                        },
                        error: function(d) {
                            m.o.error.call(m, b, "ajax")
                        }
                    })
                }
            }
        }, k);
        m.open = function(b, f, k) {
            b = void 0 === b || "#" === b ? m.o.content : b;
            if (null === b)
                return m.o.error.call(m, b, p),
                !1;
            void 0 !== k && (m.ele && m.o.activeClass && c(m.ele).removeClass(m.o.activeClass),
            m.ele = k,
            m.ele && m.o.activeClass && c(m.ele).addClass(m.o.activeClass));
            if (void 0 === d) {
                d = c('<div class="' + m.o.backClass + '"/>').appendTo(c("body")).css("opacity", 0).animate({
                    opacity: m.o.backOpacity
                }, m.o.speed);
                if (!m.o.modal)
                    d.one("click.popup", function() {
                        m.close()
                    });
                m.o.hideFlash && c("object, embed").css("visibility", "hidden");
                m.o.preloaderContent && (t = c(m.o.preloaderContent).appendTo(c("body")))
            }
            f = h([f, m.o.type]);
            p = f = "auto" === f ? e(b) : f;
            m.width = m.o.width ? m.o.width : null ;
            m.height = m.o.height ? m.o.height : null ;
            if (-1 === c.inArray(f, ["inline", "jQuery", "function"])) {
                k = l(m.o.typeParam, b);
                var g = l(m.o.widthParam, b)
                  , q = l(m.o.heightParam, b);
                f = null !== k ? k : f;
                m.width = null !== g ? g : m.width;
                m.height = null !== q ? q : m.height
            }
            m.o.beforeOpen.call(m, f);
            m.o.types[f] ? m.o.types[f].call(m, b, n) : m.o.types.ajax.call(m, b, n)
        }
        ;
        m.close = function() {
            m.o.beforeClose.call(m);
            "inline" === p && m.o.keepInlineChanges && (f = c("." + m.o.contentClass).html());
            void 0 !== d && d.animate({
                opacity: 0
            }, m.o.speed, function() {
                m.cleanUp()
            });
            m.o.hide.call(m, q, d);
            return m
        }
        ;
        m.cleanUp = function() {
            d.add(q).remove();
            q = d = void 0;
            c(b).unbind("resize", m.center);
            m.o.hideFlash && c("object, embed").css("visibility", "visible");
            m.ele && m.o.activeClass && c(m.ele).removeClass(m.o.activeClass);
            var e = c("." + m.o.popupPlaceholderClass);
            "inline" == p && e.length && e.html(f).removeClass(m.o.popupPlaceholderClass);
            p = null ;
            m.o.afterClose.call(m);
            return m
        }
        ;
        m.center = function() {
            q.css(m.getCenter());
            d.css({
                height: document.documentElement.clientHeight
            });
            return m
        }
        ;
        m.getCenter = function() {
            var b = q.children().outerWidth(!0)
              , d = q.children().outerHeight(!0);
            return {
                top: .5 * document.documentElement.clientHeight - .5 * d,
                left: .5 * document.documentElement.clientWidth - .5 * b
            }
        }
    }
})(jQuery, window);
(function(c, b, k, h, e, n, l) {
    function m() {
        var b = [];
        this.$On = this.addEventListener = function(d, c) {
            b.push({
                pc: d,
                oc: c
            })
        }
        ;
        this.$Off = this.removeEventListener = function(c, f) {
            d.a(b, function(d, e) {
                d.pc == c && d.oc === f && b.splice(e, 1)
            })
        }
        ;
        this.l = function(f) {
            var e = [].slice.call(arguments, 1);
            d.a(b, function(b) {
                b.pc == f && b.oc.apply(c, e)
            })
        }
    }
    function g(b, c, f) {
        q.call(this, 0, f);
        this.Cd = d.Sc;
        this.bd = 0;
        this.hd = f
    }
    new function() {}
    ;
    var p = c.$JssorEasing$ = {
        $EaseSwing: function(b) {
            return -k.cos(b * k.PI) / 2 + .5
        },
        $EaseLinear: function(b) {
            return b
        },
        $EaseInQuad: function(b) {
            return b * b
        },
        $EaseOutQuad: function(b) {
            return -b * (b - 2)
        },
        $EaseInOutQuad: function(b) {
            return 1 > (b *= 2) ? .5 * b * b : -.5 * (--b * (b - 2) - 1)
        },
        $EaseInCubic: function(b) {
            return b * b * b
        },
        $EaseOutCubic: function(b) {
            return --b * b * b + 1
        },
        $EaseInOutCubic: function(b) {
            return 1 > (b *= 2) ? .5 * b * b * b : .5 * ((b -= 2) * b * b + 2)
        },
        $EaseInQuart: function(b) {
            return b * b * b * b
        },
        $EaseOutQuart: function(b) {
            return -(--b * b * b * b - 1)
        },
        $EaseInOutQuart: function(b) {
            return 1 > (b *= 2) ? .5 * b * b * b * b : -.5 * ((b -= 2) * b * b * b - 2)
        },
        $EaseInQuint: function(b) {
            return b * b * b * b * b
        },
        $EaseOutQuint: function(b) {
            return --b * b * b * b * b + 1
        },
        $EaseInOutQuint: function(b) {
            return 1 > (b *= 2) ? .5 * b * b * b * b * b : .5 * ((b -= 2) * b * b * b * b + 2)
        },
        $EaseInSine: function(b) {
            return 1 - k.cos(k.PI / 2 * b)
        },
        $EaseOutSine: function(b) {
            return k.sin(k.PI / 2 * b)
        },
        $EaseInOutSine: function(b) {
            return -.5 * (k.cos(k.PI * b) - 1)
        },
        $EaseInExpo: function(b) {
            return 0 == b ? 0 : k.pow(2, 10 * (b - 1))
        },
        $EaseOutExpo: function(b) {
            return 1 == b ? 1 : -k.pow(2, -10 * b) + 1
        },
        $EaseInOutExpo: function(b) {
            return 0 == b || 1 == b ? b : 1 > (b *= 2) ? .5 * k.pow(2, 10 * (b - 1)) : .5 * (-k.pow(2, -10 * --b) + 2)
        },
        $EaseInCirc: function(b) {
            return -(k.sqrt(1 - b * b) - 1)
        },
        $EaseOutCirc: function(b) {
            return k.sqrt(1 - --b * b)
        },
        $EaseInOutCirc: function(b) {
            return 1 > (b *= 2) ? -.5 * (k.sqrt(1 - b * b) - 1) : .5 * (k.sqrt(1 - (b -= 2) * b) + 1)
        },
        $EaseInElastic: function(b) {
            return b && 1 != b ? -(k.pow(2, 10 * --b) * k.sin(2 * (b - .075) * k.PI / .3)) : b
        },
        $EaseOutElastic: function(b) {
            return b && 1 != b ? k.pow(2, -10 * b) * k.sin(2 * (b - .075) * k.PI / .3) + 1 : b
        },
        $EaseInOutElastic: function(b) {
            return b && 1 != b ? 1 > (b *= 2) ? -.5 * k.pow(2, 10 * --b) * k.sin(2 * (b - .1125) * k.PI / .45) : k.pow(2, -10 * --b) * k.sin(2 * (b - .1125) * k.PI / .45) * .5 + 1 : b
        },
        $EaseInBack: function(b) {
            return b * b * (2.70158 * b - 1.70158)
        },
        $EaseOutBack: function(b) {
            return --b * b * (2.70158 * b + 1.70158) + 1
        },
        $EaseInOutBack: function(b) {
            var d = 1.70158;
            return 1 > (b *= 2) ? .5 * b * b * (((d *= 1.525) + 1) * b - d) : .5 * ((b -= 2) * b * (((d *= 1.525) + 1) * b + d) + 2)
        },
        $EaseInBounce: function(b) {
            return 1 - p.$EaseOutBounce(1 - b)
        },
        $EaseOutBounce: function(b) {
            return b < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + .75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + .9375 : 7.5625 * (b -= 2.625 / 2.75) * b + .984375
        },
        $EaseInOutBounce: function(b) {
            return .5 > b ? .5 * p.$EaseInBounce(2 * b) : .5 * p.$EaseOutBounce(2 * b - 1) + .5
        },
        $EaseGoBack: function(b) {
            return 1 - k.abs(1)
        },
        $EaseInWave: function(b) {
            return 1 - k.cos(b * k.PI * 2)
        },
        $EaseOutWave: function(b) {
            return k.sin(b * k.PI * 2)
        },
        $EaseOutJump: function(b) {
            return 1 - (1 > (b *= 2) ? (b = 1 - b) * b * b : --b * b * b)
        },
        $EaseInJump: function(b) {
            return 1 > (b *= 2) ? b * b * b : (b = 2 - b) * b * b
        }
    }
      , f = c.$Jease$ = {
        $Swing: p.$EaseSwing,
        $Linear: p.$EaseLinear,
        $InQuad: p.$EaseInQuad,
        $OutQuad: p.$EaseOutQuad,
        $InOutQuad: p.$EaseInOutQuad,
        $InCubic: p.$EaseInCubic,
        $OutCubic: p.$EaseOutCubic,
        $InOutCubic: p.$EaseInOutCubic,
        $InQuart: p.$EaseInQuart,
        $OutQuart: p.$EaseOutQuart,
        $InOutQuart: p.$EaseInOutQuart,
        $InQuint: p.$EaseInQuint,
        $OutQuint: p.$EaseOutQuint,
        $InOutQuint: p.$EaseInOutQuint,
        $InSine: p.$EaseInSine,
        $OutSine: p.$EaseOutSine,
        $InOutSine: p.$EaseInOutSine,
        $InExpo: p.$EaseInExpo,
        $OutExpo: p.$EaseOutExpo,
        $InOutExpo: p.$EaseInOutExpo,
        $InCirc: p.$EaseInCirc,
        $OutCirc: p.$EaseOutCirc,
        $InOutCirc: p.$EaseInOutCirc,
        $InElastic: p.$EaseInElastic,
        $OutElastic: p.$EaseOutElastic,
        $InOutElastic: p.$EaseInOutElastic,
        $InBack: p.$EaseInBack,
        $OutBack: p.$EaseOutBack,
        $InOutBack: p.$EaseInOutBack,
        $InBounce: p.$EaseInBounce,
        $OutBounce: p.$EaseOutBounce,
        $InOutBounce: p.$EaseInOutBounce,
        $GoBack: p.$EaseGoBack,
        $InWave: p.$EaseInWave,
        $OutWave: p.$EaseOutWave,
        $OutJump: p.$EaseOutJump,
        $InJump: p.$EaseInJump
    }
      , d = new function() {
        function f(d) {
            if (!da)
                if (da = -1,
                "Microsoft Internet Explorer" == Ca && c.attachEvent && c.ActiveXObject) {
                    var e = ba.indexOf("MSIE");
                    da = 1;
                    ga = ha(ba.substring(e + 5, ba.indexOf(";", e)));
                    T = b.documentMode || ga
                } else if ("Netscape" == Ca && c.addEventListener) {
                    var k = ba.indexOf("Firefox")
                      , h = ba.indexOf("Safari")
                      , g = ba.indexOf("Chrome")
                      , e = ba.indexOf("AppleWebKit");
                    if (0 <= k)
                        da = 2,
                        T = ha(ba.substring(k + 8));
                    else if (0 <= h)
                        k = ba.substring(0, h).lastIndexOf("/"),
                        da = 0 <= g ? 4 : 3,
                        T = ha(ba.substring(k + 1, h));
                    else if (h = /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/i.exec(ba))
                        da = 1,
                        T = ga = ha(h[1]);
                    0 <= e && (W = ha(ba.substring(e + 12)))
                } else if (h = /(opera)(?:.*version|)[ \/]([\w.]+)/i.exec(ba))
                    da = 5,
                    T = ha(h[2]);
            return d == da
        }
        function g() {
            return f(1)
        }
        function m() {
            return f(3)
        }
        function t() {
            return f(5)
        }
        function q() {
            f();
            return 537 < W || 42 < T || 1 == da && 11 <= T
        }
        function u() {
            return g() && 9 > T
        }
        function A(b) {
            var d, c;
            return function(f) {
                if (!d) {
                    d = e;
                    var k = b.substr(0, 1).toUpperCase() + b.substr(1);
                    M([b].concat(["WebKit", "ms", "Moz", "O", "webkit"]), function(d, e) {
                        var h = b;
                        e && (h = d + k);
                        if (f.style[h] != l)
                            return c = h
                    })
                }
                return c
            }
        }
        function V(b) {
            var d;
            return function(c) {
                return d = d || A(b)(c) || b
            }
        }
        function M(b, d) {
            var c, f;
            if ("[object Array]" == {}.toString.call(b))
                for (c = 0; c < b.length; c++) {
                    if (f = d(b[c], c, b))
                        return f
                }
            else
                for (c in b)
                    if (f = d(b[c], c, b))
                        return f
        }
        function J(b) {
            return b == h ? String(b) : Pa[{}.toString.call(b)] || "object"
        }
        function B(b) {
            try {
                return "object" == J(b) && !b.nodeType && b != b.window && (!b.constructor || {}.hasOwnProperty.call(b.constructor.prototype, "isPrototypeOf"))
            } catch (d) {}
        }
        function w(b, d) {
            setTimeout(b, d || 0)
        }
        function D(b, d, c) {
            var f = b && "inherit" != b ? b : "";
            M(d, function(b) {
                var d = b.exec(f);
                d && (b = f.substr(0, d.index),
                d = f.substr(d.index + d[0].length + 1, f.length - 1),
                f = b + d)
            });
            return f = c + (f.indexOf(" ") ? " " : "") + f
        }
        function H(b) {
            b.constructor === H.caller && b.Md && b.Md.apply(b, H.caller.arguments)
        }
        function x(b) {
            return b || c.event
        }
        function G(b, d, f) {
            if (f !== l)
                b.style[d] = f == l ? "" : f;
            else {
                var e = b.currentStyle || b.style;
                f = e[d];
                "" == f && c.getComputedStyle && (e = b.ownerDocument.defaultView.getComputedStyle(b, h)) && (f = e.getPropertyValue(d) || e[d]);
                return f
            }
        }
        function I(b, d, c, f) {
            if (c !== l)
                c == h ? c = "" : f && (c += "px"),
                G(b, d, c);
            else
                return ha(G(b, d))
        }
        function v(b, d) {
            var c = d ? I : G, f;
            d & 4 && (f = V(b));
            return function(e, k) {
                return c(e, f ? f(e) : b, k, d & 2)
            }
        }
        function E(b, c) {
            var f = "";
            if (c && (g() && T && 10 > T && (delete c.$RotateX,
            delete c.$RotateY,
            delete c.$TranslateZ),
            d.a(c, function(b, d) {
                var c = Qa[d];
                if (c) {
                    var e = c[1] || 0;
                    sa[d] != b && (f += " " + c[0] + "(" + b + ["deg", "px", ""][e] + ")")
                }
            }),
            q())) {
                if (c.$TranslateX || c.$TranslateY || c.$TranslateZ)
                    f += " translate3d(" + (c.$TranslateX || 0) + "px," + (c.$TranslateY || 0) + "px," + (c.$TranslateZ || 0) + "px)";
                c.$ScaleX == l && (c.$ScaleX = 1);
                c.$ScaleY == l && (c.$ScaleY = 1);
                if (1 != c.$ScaleX || 1 != c.$ScaleY)
                    f += " scale3d(" + c.$ScaleX + ", " + c.$ScaleY + ", 1)"
            }
            b.style[Ka(b)] = f
        }
        function F(b, d, c, f) {
            f = f || "u";
            for (b = b ? b.firstChild : h; b; b = b.nextSibling)
                if (1 == b.nodeType) {
                    if (S(b, f) == d)
                        return b;
                    if (!c) {
                        var e = F(b, d, c, f);
                        if (e)
                            return e
                    }
                }
        }
        function X(b, d, c, f) {
            f = f || "u";
            var e = [];
            for (b = b ? b.firstChild : h; b; b = b.nextSibling)
                if (1 == b.nodeType && (S(b, f) == d && e.push(b),
                !c)) {
                    var k = X(b, d, c, f);
                    k.length && (e = e.concat(k))
                }
            return e
        }
        function ea(b, d, c) {
            for (b = b ? b.firstChild : h; b; b = b.nextSibling)
                if (1 == b.nodeType) {
                    if (b.tagName == d)
                        return b;
                    if (!c) {
                        var f = ea(b, d, c);
                        if (f)
                            return f
                    }
                }
        }
        function K(b, d, c) {
            var f = [];
            for (b = b ? b.firstChild : h; b; b = b.nextSibling)
                if (1 == b.nodeType && (d && b.tagName != d || f.push(b),
                !c)) {
                    var e = K(b, d, c);
                    e.length && (f = f.concat(e))
                }
            return f
        }
        function R() {
            var b = arguments, d, c, f, e, k = 1 & b[0], h = 1 + k;
            for (d = b[h - 1] || {}; h < b.length; h++)
                if (c = b[h])
                    for (f in c)
                        if (e = c[f],
                        e !== l) {
                            e = c[f];
                            var g = d[f];
                            d[f] = k && (B(g) || B(e)) ? R(k, {}, g, e) : e
                        }
            return d
        }
        function fa(b, d) {
            var c = {}, f, k, h;
            for (f in b)
                if (k = b[f],
                h = d[f],
                k !== h) {
                    var g;
                    if (B(k) && B(h)) {
                        k = fa(k, h);
                        a: {
                            h = k;
                            g = void 0;
                            for (g in h) {
                                h = e;
                                break a
                            }
                            h = void 0
                        }
                        g = !h
                    }
                    !g && (c[f] = k)
                }
            return c
        }
        function aa(b, d, c) {
            if (c == l)
                return b.getAttribute(d);
            b.setAttribute(d, c)
        }
        function S(b, d) {
            return aa(b, d) || aa(b, "data-" + d)
        }
        function O(b, d) {
            if (d == l)
                return b.className;
            b.className = d
        }
        function Y(b) {
            var d = {};
            M(b, function(b) {
                d[b] = b
            });
            return d
        }
        function ca(b, d) {
            return b.match(d || ta)
        }
        function la(b, d) {
            var c = "";
            M(d, function(d) {
                c && (c += b);
                c += d
            });
            return c
        }
        function ja(b, d, c) {
            b = b.cloneNode(!d);
            !c && r.fg(b, "id");
            return b
        }
        function C(c) {
            function f() {
                var b = n, e = g[p || m || t & 2 || t], k = c, h;
                h = O(c);
                h = Y(ca(h || "", void 0));
                O(k, la(" ", R(fa(h, Y(ca(b || "", void 0))), Y(ca(e || "", void 0)))));
                d.ab(c, "pointer-events", p ? "none" : "")
            }
            function e() {
                m = 0;
                f();
                r.R(b, "mouseup", e);
                r.R(b, "touchend", e);
                r.R(b, "touchcancel", e)
            }
            function k(d) {
                p ? r.Pb(d) : (m = 4,
                f(),
                r.c(b, "mouseup", e),
                r.c(b, "touchend", e),
                r.c(b, "touchcancel", e))
            }
            var h = "", g = [], n, m = 0, t = 0, p = 0;
            this.Jc = function(b) {
                if (b === l)
                    return t;
                t = b & 2 || b & 1;
                f()
            }
            ;
            this.$Enable = function(b) {
                if (b === l)
                    return !p;
                p = b ? 0 : 3;
                f()
            }
            ;
            this.$Elmt = c = r.gb(c);
            var q = d.hg(O(c));
            q && (h = q.shift());
            M(["av", "pv", "ds", "dn"], function(b) {
                g.push(h + b)
            });
            n = la(" ", g);
            g.unshift("");
            r.c(c, "mousedown", k);
            r.c(c, "touchstart", k)
        }
        function z(b, d) {
            function c(b, d) {
                d = d || {};
                var h = d.$TranslateZ || 0
                  , g = (d.$RotateX || 0) % 360
                  , m = (d.$RotateY || 0) % 360
                  , t = (d.$Rotate || 0) % 360
                  , p = d.Jh;
                f && (p = m = g = h = 0);
                h = new Ia(d.$TranslateX,d.$TranslateY,h);
                h.$RotateX(g);
                h.$RotateY(m);
                h.Yd(t);
                h.Vd(d.$SkewX, d.$SkewY);
                h.$Scale(d.$ScaleX, d.$ScaleY, p);
                if (e)
                    h.$Move(d.I, d.H),
                    b.style[n] = h.Ne();
                else {
                    g = "";
                    if (t || d.$ScaleX != l && 1 != d.$ScaleX || d.$ScaleY != l && 1 != d.$ScaleY) {
                        var q = d.$OriginalWidth
                          , t = d.$OriginalHeight
                          , g = h.mb({
                            x: -q / 2,
                            y: -t / 2
                        })
                          , m = h.mb({
                            x: q / 2,
                            y: -t / 2
                        })
                          , p = h.mb({
                            x: q / 2,
                            y: t / 2
                        })
                          , u = h.mb({
                            x: -q / 2,
                            y: t / 2
                        });
                        h.mb({
                            x: 300,
                            y: 300
                        });
                        q = k.min(g.x, m.x, p.x, u.x) + q / 2;
                        t = k.min(g.y, m.y, p.y, u.y) + t / 2;
                        r.Qf(b, t);
                        r.Af(b, q);
                        g = h.Qe()
                    }
                    h = D(b.style.filter, [new RegExp(/[\s]*progid:DXImageTransform\.Microsoft\.Matrix\([^\)]*\)/g)], g);
                    9 > T && (b.style.filter = h)
                }
            }
            var f = u()
              , e = q()
              , g = m() && 534 < W && 535 > W
              , n = Ka(b);
            z = function(b, d) {
                d = d || {};
                var f = d.I, k = d.H, n;
                M(fb, function(c, f) {
                    n = d[f];
                    n !== l && c(b, n)
                });
                r.Zf(b, d.$Clip);
                e || (f != l && r.A(b, (d.gd || 0) + f),
                k != l && r.z(b, (d.Uc || 0) + k));
                d.Re && (g ? w(r.E(h, E, b, d)) : c(b, d))
            }
            ;
            r.Eb = E;
            g && (r.Eb = z);
            f ? r.Eb = c : e || (c = E);
            r.K = z;
            z(b, d)
        }
        function Ia(b, d, c) {
            function f(b, d, c, e, k, h, g, l, n, m, t, p, q, u, ra, N, y, r, F, Ja, A, w, C, L, x, Q, B, v, Ha, V, M, z) {
                return [b * y + d * A + c * x + e * Ha, b * r + d * w + c * Q + e * V, b * F + d * C + c * B + e * M, b * Ja + d * L + c * v + e * z, k * y + h * A + g * x + l * Ha, k * r + h * w + g * Q + l * V, k * F + h * C + g * B + l * M, k * Ja + h * L + g * v + l * z, n * y + m * A + t * x + p * Ha, n * r + m * w + t * Q + p * V, n * F + m * C + t * B + p * M, n * Ja + m * L + t * v + p * z, q * y + u * A + ra * x + N * Ha, q * r + u * w + ra * Q + N * V, q * F + u * C + ra * B + N * M, q * Ja + u * L + ra * v + N * z]
            }
            function e(b, d) {
                return f.apply(h, (d || g).concat(b))
            }
            var g = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, b || 0, d || 0, c || 0, 1]
              , n = k.sin
              , m = k.cos
              , t = k.tan;
            this.$Scale = function(b, d, c) {
                b == l && (b = 1);
                d == l && (d = 1);
                c == l && (c = 1);
                if (1 != b || 1 != d || 1 != c)
                    g = e([b, 0, 0, 0, 0, d, 0, 0, 0, 0, c, 0, 0, 0, 0, 1])
            }
            ;
            this.$Move = function(b, d, c) {
                g[12] += b || 0;
                g[13] += d || 0;
                g[14] += c || 0
            }
            ;
            this.$RotateX = function(b) {
                if (b) {
                    a = b * k.PI / 180;
                    b = m(a);
                    var d = n(a);
                    g = e([1, 0, 0, 0, 0, b, d, 0, 0, -d, b, 0, 0, 0, 0, 1])
                }
            }
            ;
            this.$RotateY = function(b) {
                if (b) {
                    a = b * k.PI / 180;
                    b = m(a);
                    var d = n(a);
                    g = e([b, 0, -d, 0, 0, 1, 0, 0, d, 0, b, 0, 0, 0, 0, 1])
                }
            }
            ;
            this.Yd = function(b) {
                if (b) {
                    a = b * k.PI / 180;
                    b = m(a);
                    var d = n(a);
                    g = e([b, d, 0, 0, -d, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
                }
            }
            ;
            this.Vd = function(c, f) {
                if (c || f)
                    b = c * k.PI / 180,
                    d = f * k.PI / 180,
                    g = e([1, t(d), 0, 0, t(b), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
            }
            ;
            this.mb = function(b) {
                b = e(g, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, b.x, b.y, 0, 1]);
                return {
                    x: b[12],
                    y: b[13]
                }
            }
            ;
            this.Ne = function() {
                return "matrix3d(" + g.join(",") + ")"
            }
            ;
            this.Qe = function() {
                return "progid:DXImageTransform.Microsoft.Matrix(M11=" + g[0] + ", M12=" + g[4] + ", M21=" + g[1] + ", M22=" + g[5] + ", SizingMethod='auto expand')"
            }
        }
        function Ta(b, d) {
            var c = {};
            M(b, function(b, f) {
                var e = b;
                d[f] != l && (e = r.Hb(b) ? b + d[f] : Ta(b, d[f]));
                c[f] = e
            });
            return c
        }
        var r = this, ta = /\S+/g, Ba, da = 0, T = 0, ga = 0, W = 0, U = navigator, Ca = U.appName, ba = U.userAgent, ha = parseFloat, Ka = V("transform"), Pa = {};
        M("Boolean Number String Function Array Date RegExp Object".split(" "), function(b) {
            Pa["[object " + b + "]"] = b.toLowerCase()
        });
        r.kf = function() {
            if (!Ba) {
                Ba = {
                    Wf: "ontouchstart"in c || "createTouch"in b
                };
                var d;
                if (U.pointerEnabled || (d = U.msPointerEnabled))
                    Ba.nd = d ? "msTouchAction" : "touchAction"
            }
            return Ba
        }
        ;
        r.Nd = g;
        r.jf = m;
        r.Dd = t;
        r.nf = q;
        r.fb = u;
        A("transform");
        r.Jd = function() {
            return T
        }
        ;
        r.lf = function() {
            f();
            return W
        }
        ;
        r.$Delay = w;
        r.Md = H;
        r.gb = function(d) {
            r.cf(d) && (d = b.getElementById(d));
            return d
        }
        ;
        r.Id = x;
        r.mc = function(d) {
            d = x(d);
            d = d.target || d.srcElement || b;
            3 == d.nodeType && (d = r.Bd(d));
            return d
        }
        ;
        r.Ed = function(b) {
            b = x(b);
            return {
                x: b.pageX || b.clientX || 0,
                y: b.pageY || b.clientY || 0
            }
        }
        ;
        var Qa = {
            $Rotate: ["rotate"],
            $RotateX: ["rotateX"],
            $RotateY: ["rotateY"],
            $SkewX: ["skewX"],
            $SkewY: ["skewY"]
        };
        q() || (Qa = R(Qa, {
            $ScaleX: ["scaleX", 2],
            $ScaleY: ["scaleY", 2],
            $TranslateZ: ["translateZ", 1]
        }));
        r.Ic = v("transformOrigin", 4);
        r.zf = v("backfaceVisibility", 4);
        r.yf = v("transformStyle", 4);
        r.xf = v("perspective", 6);
        r.qf = v("perspectiveOrigin", 4);
        r.pf = function(d, c) {
            if (g() && 9 > ga || 10 > ga && g() && (6 > T || "BackCompat" == b.compatMode))
                d.style.zoom = 1 == c ? "" : c;
            else {
                var f = Ka(d)
                  , e = D(d.style[f], [new RegExp(/[\s]*scale\(.*?\)/g)], "scale(" + c + ")");
                d.style[f] = e
            }
        }
        ;
        r.Sb = function(b, d) {
            return function(c) {
                c = x(c);
                var f = c.type;
                (f = c.relatedTarget || ("mouseout" == f ? c.toElement : c.fromElement)) && (f === d || r.of(d, f)) || b(c)
            }
        }
        ;
        r.c = function(b, d, c, f) {
            b = r.gb(b);
            b.addEventListener ? ("mousewheel" == d && b.addEventListener("DOMMouseScroll", c, f),
            b.addEventListener(d, c, f)) : b.attachEvent && (b.attachEvent("on" + d, c),
            f && b.setCapture && b.setCapture())
        }
        ;
        r.R = function(b, d, c, f) {
            b = r.gb(b);
            b.removeEventListener ? ("mousewheel" == d && b.removeEventListener("DOMMouseScroll", c, f),
            b.removeEventListener(d, c, f)) : b.detachEvent && (b.detachEvent("on" + d, c),
            f && b.releaseCapture && b.releaseCapture())
        }
        ;
        r.Pb = function(b) {
            b = x(b);
            b.preventDefault && b.preventDefault();
            b.cancel = e;
            b.returnValue = n
        }
        ;
        r.rf = function(b) {
            b = x(b);
            b.stopPropagation && b.stopPropagation();
            b.cancelBubble = e
        }
        ;
        r.E = function(b, d) {
            var c = [].slice.call(arguments, 2);
            return function() {
                var f = c.concat([].slice.call(arguments, 0));
                return d.apply(b, f)
            }
        }
        ;
        r.Ig = function(d, c) {
            if (c == l)
                return d.textContent || d.innerText;
            var f = b.createTextNode(c);
            r.qc(d);
            d.appendChild(f)
        }
        ;
        r.Ab = function(b, d) {
            for (var c = [], f = b.firstChild; f; f = f.nextSibling)
                (d || 1 == f.nodeType) && c.push(f);
            return c
        }
        ;
        r.C = F;
        r.Jg = ea;
        r.Ng = K;
        r.Bg = function(b, d) {
            return b.getElementsByTagName(d)
        }
        ;
        r.o = R;
        r.Wc = function(b) {
            return "function" == J(b)
        }
        ;
        r.cf = function(b) {
            return "string" == J(b)
        }
        ;
        r.Hb = function(b) {
            return !isNaN(ha(b)) && isFinite(b)
        }
        ;
        r.a = M;
        r.Yc = B;
        r.jb = function() {
            return b.createElement("DIV")
        }
        ;
        r.Dg = function() {
            return b.createElement("SPAN")
        }
        ;
        r.Sc = function() {}
        ;
        r.v = aa;
        r.j = S;
        r.ad = O;
        r.hg = ca;
        r.Bd = function(b) {
            return b.parentNode
        }
        ;
        r.Q = function(b) {
            r.T(b, "none")
        }
        ;
        r.u = function(b, d) {
            r.T(b, d ? "none" : "")
        }
        ;
        r.fg = function(b, d) {
            b.removeAttribute(d)
        }
        ;
        r.ag = function() {
            return g() && 10 > T
        }
        ;
        r.Zf = function(b, c) {
            if (c)
                b.style.clip = "rect(" + k.round(c.$Top || c.H || 0) + "px " + k.round(c.$Right) + "px " + k.round(c.$Bottom) + "px " + k.round(c.$Left || c.I || 0) + "px)";
            else if (c !== l) {
                var f = D(b.style.cssText, [new RegExp(/[\s]*clip: rect\(.*?\)[;]?/i), new RegExp(/[\s]*cliptop: .*?[;]?/i), new RegExp(/[\s]*clipright: .*?[;]?/i), new RegExp(/[\s]*clipbottom: .*?[;]?/i), new RegExp(/[\s]*clipleft: .*?[;]?/i)], "");
                d.ac(b, f)
            }
        }
        ;
        r.M = function() {
            return +new Date
        }
        ;
        r.J = function(b, d) {
            b.appendChild(d)
        }
        ;
        r.Vb = function(b, d, c) {
            (c || d.parentNode).insertBefore(b, d)
        }
        ;
        r.zb = function(b, d) {
            (d = d || b.parentNode) && d.removeChild(b)
        }
        ;
        r.xg = function(b, d) {
            M(b, function(b) {
                r.zb(b, d)
            })
        }
        ;
        r.qc = function(b) {
            r.xg(r.Ab(b, e), b)
        }
        ;
        r.wg = function(b, d) {
            var c = r.Bd(b);
            d & 1 && r.A(b, (r.k(c) - r.k(b)) / 2);
            d & 2 && r.z(b, (r.m(c) - r.m(b)) / 2)
        }
        ;
        r.zc = function(b, d) {
            return parseInt(b, d || 10)
        }
        ;
        r.rg = ha;
        r.of = function(d, c) {
            for (var f = b.body; c && d !== c && f !== c; )
                try {
                    c = c.parentNode
                } catch (e) {
                    return n
                }
            return d === c
        }
        ;
        r.Z = ja;
        r.xb = function(b, d) {
            function c(b, e) {
                r.R(k, "load", c);
                r.R(k, "abort", f);
                r.R(k, "error", f);
                d && d(k, e)
            }
            function f(b) {
                c(b, e)
            }
            var k = new Image;
            t() && 11.6 > T || !b ? c(!b) : (r.c(k, "load", c),
            r.c(k, "abort", f),
            r.c(k, "error", f),
            k.src = b)
        }
        ;
        r.af = function(b, d, c) {
            function f(b) {
                e--;
                d && b && b.src == d.src && (d = b);
                !e && c && c(d)
            }
            var e = b.length + 1;
            M(b, function(b) {
                r.xb(b.src, f)
            });
            f()
        }
        ;
        r.Gc = function(b, c, f, e) {
            e && (b = ja(b));
            e = X(b, c);
            e.length || (e = d.Bg(b, c));
            for (c = e.length - 1; -1 < c; c--) {
                var k = e[c]
                  , h = ja(f);
                O(h, O(k));
                d.ac(h, k.style.cssText);
                d.Vb(h, k);
                d.zb(k)
            }
            return b
        }
        ;
        r.Tb = function(b) {
            return new C(b)
        }
        ;
        r.ab = G;
        r.kb = v("overflow");
        r.z = v("top", 2);
        r.A = v("left", 2);
        r.k = v("width", 2);
        r.m = v("height", 2);
        r.Af = v("marginLeft", 2);
        r.Qf = v("marginTop", 2);
        r.B = v("position");
        r.T = v("display");
        r.F = v("zIndex", 1);
        r.yb = function(b, d, c) {
            if (d != l)
                if (g() && 9 > ga) {
                    var f = b.style.filter || ""
                      , e = new RegExp(/[\s]*alpha\([^\)]*\)/g);
                    d = k.round(100 * d);
                    var h = "";
                    if (100 > d || c)
                        h = "alpha(opacity=" + d + ") ";
                    c = D(f, [e], h);
                    9 > T && (b.style.filter = c)
                } else
                    b.style.opacity = 1 == d ? "" : k.round(100 * d) / 100;
            else
                return b = g() && 9 > ga ? (b = /opacity=([^)]*)/.exec(b.style.filter || "")) ? ha(b[1]) / 100 : 1 : ha(b.style.opacity || "1"),
                b
        }
        ;
        r.ac = function(b, d) {
            if (d != l)
                b.style.cssText = d;
            else
                return b.style.cssText
        }
        ;
        var fb = {
            $Opacity: r.yb,
            $Top: r.z,
            $Left: r.A,
            S: r.k,
            O: r.m,
            Db: r.B,
            Ih: r.T,
            $ZIndex: r.F
        };
        r.Eb = z;
        r.K = z;
        new function() {
            function b(d, c) {
                for (var f = d[0].length, e = d.length, k = c[0].length, h = [], g = 0; g < e; g++)
                    for (var l = h[g] = [], n = 0; n < k; n++) {
                        for (var m = 0, t = 0; t < f; t++)
                            m += d[g][t] * c[t][n];
                        l[n] = m
                    }
                return h
            }
            var d = this;
            d.$ScaleX = function(b, c) {
                return d.Xc(b, c, 0)
            }
            ;
            d.$ScaleY = function(b, c) {
                return d.Xc(b, 0, c)
            }
            ;
            d.Xc = function(d, c, f) {
                return b(d, [[c, 0], [0, f]])
            }
            ;
            d.mb = function(d, c) {
                var f = b(d, [[c.x], [c.y]]);
                return {
                    x: f[0][0],
                    y: f[1][0]
                }
            }
        }
        ;
        var sa = {
            gd: 0,
            Uc: 0,
            I: 0,
            H: 0,
            $Zoom: 1,
            $ScaleX: 1,
            $ScaleY: 1,
            $Rotate: 0,
            $RotateX: 0,
            $RotateY: 0,
            $TranslateX: 0,
            $TranslateY: 0,
            $TranslateZ: 0,
            $SkewX: 0,
            $SkewY: 0
        };
        r.fc = function(b) {
            var c = b || {};
            b && (d.Wc(b) ? c = {
                hc: c
            } : d.Wc(b.$Clip) && (c.$Clip = {
                hc: b.$Clip
            }));
            return c
        }
        ;
        r.ze = Ta;
        r.Tc = function(b, c, f, g, n, m, t) {
            var q = c;
            if (b) {
                var q = {}, u;
                for (u in c) {
                    var N = m[u] || 1
                      , y = n[u] || [0, 1]
                      , r = (f - y[0]) / y[1]
                      , r = k.min(k.max(r, 0), 1)
                      , r = r * N
                      , N = k.floor(r);
                    r != N && (r -= N);
                    var F = g.hc || p.$EaseSwing, A, N = b[u], y = c[u];
                    if (d.Hb(y)) {
                        var F = g[u] || F
                          , w = F(r);
                        A = N + y * w
                    } else {
                        A = d.o({
                            Jb: {}
                        }, b[u]);
                        var C = g[u] || {};
                        d.a(y.Jb || y, function(b, d) {
                            F = C[d] || C.hc || F;
                            var c = F(r)
                              , c = b * c;
                            A.Jb[d] = c;
                            A[d] += c
                        })
                    }
                    q[u] = A
                }
                (f = d.a(c, function(b, d) {
                    return sa[d] != l
                })) && d.a(sa, function(d, c) {
                    q[c] == l && b[c] !== l && (q[c] = b[c])
                });
                f && (q.$Zoom && (q.$ScaleX = q.$ScaleY = q.$Zoom),
                q.$OriginalWidth = t.$OriginalWidth,
                q.$OriginalHeight = t.$OriginalHeight,
                q.Re = e)
            }
            c.$Clip && t.$Move && (f = q.$Clip.Jb,
            c = (f.$Top || 0) + (f.$Bottom || 0),
            f = (f.$Left || 0) + (f.$Right || 0),
            q.$Left = (q.$Left || 0) + f,
            q.$Top = (q.$Top || 0) + c,
            q.$Clip.$Left -= f,
            q.$Clip.$Right -= f,
            q.$Clip.$Top -= c,
            q.$Clip.$Bottom -= c);
            !q.$Clip || !d.ag() || q.$Clip.$Top || q.$Clip.$Left || q.$Clip.H || q.$Clip.I || q.$Clip.$Right != t.$OriginalWidth || q.$Clip.$Bottom != t.$OriginalHeight || (q.$Clip = h);
            return q
        }
    }
      , q = function(b, f, g, l, m, t) {
        function q(b) {
            var c = b;
            Y && (c >= O || c <= S) && (c = ((c - S) % Y + Y) % Y + S);
            if (!fa || G || K != c) {
                var h = k.min(c, O)
                  , h = k.max(h, S);
                if (!fa || G || h != R) {
                    if (t) {
                        var n = (h - aa) / (f || 1);
                        g.$Reverse && (n = 1 - n);
                        n = d.Tc(m, t, n, v, F, E, g);
                        la ? d.a(n, function(b, d) {
                            la[d] && la[d](l, b)
                        }) : d.K(l, n)
                    }
                    w.nc(R - aa, h - aa);
                    R = h;
                    d.a(ca, function(d, c) {
                        (b < K ? ca[ca.length - c - 1] : d).D(R - ea)
                    });
                    h = K;
                    n = R;
                    K = c;
                    fa = e;
                    w.Ub(h, n)
                }
            }
        }
        function p(b, d, c) {
            d && b.$Shift(O);
            c || (S = k.min(S, b.jc() + ea),
            O = k.max(O, b.Zb() + ea));
            ca.push(b)
        }
        function u() {
            if (D) {
                var b = d.M()
                  , c = k.min(b - I, g.Fc)
                  , c = K + c * x;
                I = b;
                c * x >= H * x && (c = H);
                q(c);
                !G && c * x >= H * x ? B(X) : ja(u)
            }
        }
        function A(b, c, f) {
            D || (D = e,
            G = f,
            X = c,
            b = k.max(b, S),
            H = b = k.min(b, O),
            x = H < K ? -1 : 1,
            w.Qc(),
            I = d.M(),
            ja(u))
        }
        function B(b) {
            D && (G = D = X = n,
            w.Kc(),
            b && b())
        }
        b = b || 0;
        var w = this, D, H, x, G, I = 0, v, E, F, X, ea = 0, K = 0, R = 0, fa, aa, S, O, Y, ca = [], la, ja = c.requestAnimationFrame || c.webkitRequestAnimationFrame || c.mozRequestAnimationFrame || c.msRequestAnimationFrame;
        d.jf() && 7 > d.Jd() && (ja = h);
        ja = ja || function(b) {
            d.$Delay(b, g.$Interval)
        }
        ;
        w.$Play = function(b, d, c) {
            A(b ? K + b : O, d, c)
        }
        ;
        w.Lc = A;
        w.pb = B;
        w.Oe = function(b) {
            A(b)
        }
        ;
        w.W = function() {
            return K
        }
        ;
        w.Hd = function() {
            return H
        }
        ;
        w.qb = function() {
            return R
        }
        ;
        w.D = q;
        w.$Move = function(b) {
            q(K + b)
        }
        ;
        w.$IsPlaying = function() {
            return D
        }
        ;
        w.Ae = function(b) {
            Y = b
        }
        ;
        w.$Shift = function(b) {
            S += b;
            O += b;
            aa += b;
            K += b;
            R += b;
            ea += b
        }
        ;
        w.wb = function(b, d) {
            p(b, 0, d)
        }
        ;
        w.rc = function(b) {
            p(b, 1)
        }
        ;
        w.Fe = function(b) {
            O += b
        }
        ;
        w.jc = function() {
            return S
        }
        ;
        w.Zb = function() {
            return O
        }
        ;
        w.Ub = w.Qc = w.Kc = w.nc = d.Sc;
        w.sc = d.M();
        g = d.o({
            $Interval: 16,
            Fc: 50
        }, g);
        Y = g.pd;
        la = g.Be;
        S = aa = b;
        O = b + f;
        E = g.$Round || {};
        F = g.$During || {};
        v = d.fc(g.$Easing)
    }
      , t = c.$JssorSlideshowFormations$ = new function() {
        function b(d, c, f) {
            f.push(c);
            d[c] = d[c] || [];
            d[c].push(f)
        }
        this.$FormationStraight = function(d) {
            var c = d.$Cols, f = d.$Rows, e = d.$Assembly, k = [], h, g = c - 1, l = f - 1, n = d.Ib - 1, m;
            for (h = 0; h < f; h++)
                for (d = 0; d < c; d++) {
                    switch (e) {
                    case 2049:
                        m = n - (d * f + (l - h));
                        break;
                    case 1028:
                        m = n - (h * c + (g - d));
                        break;
                    case 513:
                    case 260:
                        m = n - (h * c + d);
                        break;
                    case 2050:
                        m = d * f + h;
                        break;
                    case 264:
                        m = h * c + (g - d);
                        break;
                    case 514:
                        m = d * f + (l - h);
                        break;
                    default:
                        m = h * c + d
                    }
                    b(k, m, [h, d])
                }
            return k
        }
        ;
        this.$FormationSwirl = function(d) {
            var c = d.$Cols, f = d.$Rows, k = d.Ib, h = [], g = [], l, n;
            n = c - 1;
            l = f - 1;
            var m, t, q = 0;
            switch (d.$Assembly) {
            case 2049:
                d = n;
                n = 0;
                t = [2, 1, 3, 0];
                break;
            case 1028:
                d = 0;
                n = l;
                t = [0, 3, 1, 2];
                break;
            case 513:
                d = n;
                n = l;
                t = [3, 1, 2, 0];
                break;
            case 260:
                d = n;
                n = l;
                t = [1, 3, 0, 2];
                break;
            case 2050:
                n = d = 0;
                t = [2, 0, 3, 1];
                break;
            case 264:
                d = n;
                n = 0;
                t = [1, 2, 0, 3];
                break;
            case 514:
                d = 0;
                n = l;
                t = [3, 0, 2, 1];
                break;
            default:
                n = d = 0,
                t = [0, 2, 1, 3]
            }
            for (l = 0; l < k; ) {
                m = n + "," + d;
                if (0 <= d && d < c && 0 <= n && n < f && !g[m])
                    g[m] = e,
                    b(h, l++, [n, d]);
                else
                    switch (t[q++ % t.length]) {
                    case 0:
                        d--;
                        break;
                    case 2:
                        n--;
                        break;
                    case 1:
                        d++;
                        break;
                    case 3:
                        n++
                    }
                switch (t[q % t.length]) {
                case 0:
                    d++;
                    break;
                case 2:
                    n++;
                    break;
                case 1:
                    d--;
                    break;
                case 3:
                    n--
                }
            }
            return h
        }
        ;
        this.$FormationZigZag = function(d) {
            var c = d.$Cols, f = d.$Rows, e = d.Ib, k = [], h, g;
            g = c - 1;
            h = f - 1;
            var l, n, m = 0;
            switch (d.$Assembly) {
            case 2049:
                d = g;
                g = 0;
                n = [2, 1, 3, 1];
                break;
            case 1028:
                d = 0;
                g = h;
                n = [0, 3, 1, 3];
                break;
            case 513:
                d = g;
                g = h;
                n = [3, 1, 2, 1];
                break;
            case 260:
                d = g;
                g = h;
                n = [1, 3, 0, 3];
                break;
            case 2050:
                g = d = 0;
                n = [2, 0, 3, 0];
                break;
            case 264:
                d = g;
                g = 0;
                n = [1, 2, 0, 2];
                break;
            case 514:
                d = 0;
                g = h;
                n = [3, 0, 2, 0];
                break;
            default:
                g = d = 0,
                n = [0, 2, 1, 2]
            }
            for (h = 0; h < e; )
                if (l = g + "," + d,
                0 <= d && d < c && 0 <= g && g < f && "undefined" == typeof k[l])
                    switch (b(k, h++, [g, d]),
                    n[m % n.length]) {
                    case 0:
                        d++;
                        break;
                    case 2:
                        g++;
                        break;
                    case 1:
                        d--;
                        break;
                    case 3:
                        g--
                    }
                else {
                    switch (n[m++ % n.length]) {
                    case 0:
                        d--;
                        break;
                    case 2:
                        g--;
                        break;
                    case 1:
                        d++;
                        break;
                    case 3:
                        g++
                    }
                    switch (n[m++ % n.length]) {
                    case 0:
                        d++;
                        break;
                    case 2:
                        g++;
                        break;
                    case 1:
                        d--;
                        break;
                    case 3:
                        g--
                    }
                }
            return k
        }
        ;
        this.$FormationStraightStairs = function(d) {
            var c = d.$Assembly, f = d.Ib, e = [], k = 0, h, g = d.$Cols - 1, n = d.$Rows - 1, l = f - 1;
            switch (c) {
            case 2049:
            case 514:
            case 513:
            case 2050:
                var m = 0
                  , t = 0;
                break;
            case 264:
            case 1028:
            case 260:
            case 1032:
                m = g;
                t = 0;
                break;
            default:
                c = 1032,
                m = g,
                t = 0
            }
            d = m;
            for (h = t; k < f; ) {
                4 == (c & 4) || 2 == (c & 2) ? b(e, l - k++, [h, d]) : b(e, k++, [h, d]);
                switch (c) {
                case 2049:
                case 514:
                    d--;
                    h++;
                    break;
                case 513:
                case 2050:
                    d++;
                    h--;
                    break;
                case 264:
                case 1028:
                    d--;
                    h--;
                    break;
                default:
                    d++,
                    h++
                }
                if (0 > d || 0 > h || d > g || h > n) {
                    switch (c) {
                    case 2049:
                    case 514:
                        m++;
                        break;
                    case 264:
                    case 1028:
                    case 513:
                    case 2050:
                        t++;
                        break;
                    default:
                        m--
                    }
                    if (0 > m || 0 > t || m > g || t > n) {
                        switch (c) {
                        case 2049:
                        case 514:
                            m = g;
                            t++;
                            break;
                        case 513:
                        case 2050:
                            t = n;
                            m++;
                            break;
                        case 264:
                        case 1028:
                            t = n;
                            m--;
                            break;
                        default:
                            m = 0,
                            t++
                        }
                        t > n ? t = n : 0 > t ? t = 0 : m > g ? m = g : 0 > m && (m = 0)
                    }
                    h = t;
                    d = m
                }
            }
            return e
        }
        ;
        this.$FormationSquare = function(d) {
            var c = d.$Cols || 1;
            d = d.$Rows || 1;
            var f = [], e, h, g, n, l;
            g = c < d ? (d - c) / 2 : 0;
            n = c > d ? (c - d) / 2 : 0;
            l = k.round(k.max(c / 2, d / 2)) + 1;
            for (e = 0; e < c; e++)
                for (h = 0; h < d; h++)
                    b(f, l - k.min(e + 1 + g, h + 1 + n, c - e + g, d - h + n), [h, e]);
            return f
        }
        ;
        this.$FormationRectangle = function(d) {
            var c = d.$Cols || 1;
            d = d.$Rows || 1;
            var f = [], e, h, g;
            g = k.round(k.min(c / 2, d / 2)) + 1;
            for (e = 0; e < c; e++)
                for (h = 0; h < d; h++)
                    b(f, g - k.min(e + 1, h + 1, c - e, d - h), [h, e]);
            return f
        }
        ;
        this.$FormationRandom = function(d) {
            for (var c = [], f, e = 0; e < d.$Rows; e++)
                for (f = 0; f < d.$Cols; f++)
                    b(c, k.ceil(1E5 * k.random()) % 13, [e, f]);
            return c
        }
        ;
        this.$FormationCircle = function(d) {
            var c = d.$Cols || 1;
            d = d.$Rows || 1;
            for (var f = [], e, h = c / 2 - .5, g = d / 2 - .5, n = 0; n < c; n++)
                for (e = 0; e < d; e++)
                    b(f, k.round(k.sqrt(k.pow(n - h, 2) + k.pow(e - g, 2))), [e, n]);
            return f
        }
        ;
        this.$FormationCross = function(d) {
            var c = d.$Cols || 1;
            d = d.$Rows || 1;
            for (var f = [], e, h = c / 2 - .5, g = d / 2 - .5, n = 0; n < c; n++)
                for (e = 0; e < d; e++)
                    b(f, k.round(k.min(k.abs(n - h), k.abs(e - g))), [e, n]);
            return f
        }
        ;
        this.$FormationRectangleCross = function(d) {
            var c = d.$Cols || 1;
            d = d.$Rows || 1;
            for (var f = [], e, h = c / 2 - .5, g = d / 2 - .5, n = k.max(h, g) + 1, l = 0; l < c; l++)
                for (e = 0; e < d; e++)
                    b(f, k.round(n - k.max(h - k.abs(l - h), g - k.abs(e - g))) - 1, [e, l]);
            return f
        }
    }
    ;
    c.$JssorSlideshowRunner$ = function(b, c, f, g, l) {
        function u(b) {
            b.$Top && (b.H = b.$Top);
            b.$Left && (b.I = b.$Left);
            d.a(b, function(b) {
                d.Yc(b) && u(b)
            })
        }
        function A(b, c) {
            var f = {
                $Interval: c,
                $Duration: 1,
                $Delay: 0,
                $Cols: 1,
                $Rows: 1,
                $Opacity: 0,
                $Zoom: 0,
                $Clip: 0,
                $Move: n,
                $SlideOut: n,
                $Reverse: n,
                $Formation: t.$FormationRandom,
                $Assembly: 1032,
                $ChessMode: {
                    $Column: 0,
                    $Row: 0
                },
                $Easing: p.$EaseSwing,
                $Round: {},
                Kb: [],
                $During: {}
            };
            d.o(f, b);
            u(f);
            f.Ib = f.$Cols * f.$Rows;
            f.$Easing = d.fc(f.$Easing);
            f.Ud = k.ceil(f.$Duration / f.$Interval);
            f.Od = function(b, d) {
                b /= f.$Cols;
                d /= f.$Rows;
                var c = b + "x" + d;
                if (!f.Kb[c]) {
                    f.Kb[c] = {
                        S: b,
                        O: d
                    };
                    for (var e = 0; e < f.$Cols; e++)
                        for (var h = 0; h < f.$Rows; h++)
                            f.Kb[c][h + "," + e] = {
                                $Top: h * d,
                                $Right: e * b + b,
                                $Bottom: h * d + d,
                                $Left: e * b
                            }
                }
                return f.Kb[c]
            }
            ;
            f.$Brother && (f.$Brother = A(f.$Brother, c),
            f.$SlideOut = e);
            return f
        }
        function V(b, c, f, g, l, m) {
            var t, q = {}, p = {}, u = [], y, A, x, w = f.$ChessMode.$Column || 0, D = f.$ChessMode.$Row || 0, C = f.Od(l, m), z = function(b) {
                var d = b.$Formation(b);
                return b.$Reverse ? d.reverse() : d
            }(f), H = f.$Duration + f.$Delay * (z.length - 1), B = f.$SlideOut, r;
            this.vd = g + H + 50;
            this.dc = function(b) {
                b -= g;
                var c = b < H;
                if (c || r) {
                    r = c;
                    B || (b = H - b);
                    var e = k.ceil(b / f.$Interval);
                    d.a(p, function(b, c) {
                        var f = k.max(e, b.ke)
                          , f = k.min(f, b.length - 1);
                        b.ud != f && (b.ud || B ? f == b.ee && B && d.Q(u[c]) : d.u(u[c]),
                        b.ud = f,
                        d.K(u[c], b[f]))
                    })
                }
            }
            ;
            c = d.Z(c);
            d.Eb(c, h);
            if (d.fb()) {
                var G = !c["no-image"]
                  , N = d.Ng(c);
                d.a(N, function(b) {
                    (G || b["jssor-slider"]) && d.yb(b, d.yb(b), e)
                })
            }
            d.a(z, function(b, c) {
                d.a(b, function(b) {
                    var h = b[0]
                      , g = b[1];
                    b = h + "," + g;
                    var u = n
                      , r = n
                      , v = n;
                    w && g % 2 && (w & 3 && (u = !u),
                    w & 12 && (r = !r),
                    w & 16 && (v = !v));
                    D && h % 2 && (D & 3 && (u = !u),
                    D & 12 && (r = !r),
                    D & 16 && (v = !v));
                    f.$Top = f.$Top || f.$Clip & 4;
                    f.$Bottom = f.$Bottom || f.$Clip & 8;
                    f.$Left = f.$Left || f.$Clip & 1;
                    f.$Right = f.$Right || f.$Clip & 2;
                    var h = r ? f.$Bottom : f.$Top
                      , g = r ? f.$Top : f.$Bottom
                      , z = u ? f.$Right : f.$Left
                      , H = u ? f.$Left : f.$Right;
                    f.$Clip = h || g || z || H;
                    x = {};
                    A = {
                        H: 0,
                        I: 0,
                        $Opacity: 1,
                        S: l,
                        O: m
                    };
                    y = d.o({}, A);
                    t = d.o({}, C[b]);
                    f.$Opacity && (A.$Opacity = 2 - f.$Opacity);
                    f.$ZIndex && (A.$ZIndex = f.$ZIndex,
                    y.$ZIndex = 0);
                    var G = 1 < f.$Cols * f.$Rows || f.$Clip;
                    if (f.$Zoom || f.$Rotate) {
                        var N = e;
                        d.fb() && (1 < f.$Cols * f.$Rows ? N = n : G = n);
                        if (N) {
                            A.$Zoom = f.$Zoom ? f.$Zoom - 1 : 1;
                            y.$Zoom = 1;
                            if (d.fb() || d.Dd())
                                A.$Zoom = k.min(A.$Zoom, 2);
                            A.$Rotate = 360 * (f.$Rotate || 0) * (v ? -1 : 1);
                            y.$Rotate = 0
                        }
                    }
                    G && (v = t.Jb = {},
                    f.$Clip && (G = f.$ScaleClip || 1,
                    h && g ? (v.$Top = C.O / 2 * G,
                    v.$Bottom = -v.$Top) : h ? v.$Bottom = -C.O * G : g && (v.$Top = C.O * G),
                    z && H ? (v.$Left = C.S / 2 * G,
                    v.$Right = -v.$Left) : z ? v.$Right = -C.S * G : H && (v.$Left = C.S * G)),
                    x.$Clip = t,
                    y.$Clip = C[b]);
                    u = u ? 1 : -1;
                    r = r ? 1 : -1;
                    f.x && (A.I += l * f.x * u);
                    f.y && (A.H += m * f.y * r);
                    d.a(A, function(b, c) {
                        d.Hb(b) && b != y[c] && (x[c] = b - y[c])
                    });
                    q[b] = B ? y : A;
                    r = f.Ud;
                    u = k.round(c * f.$Delay / f.$Interval);
                    p[b] = Array(u);
                    p[b].ke = u;
                    p[b].ee = u + r - 1;
                    for (u = 0; u <= r; u++)
                        v = d.Tc(y, x, u / r, f.$Easing, f.$During, f.$Round, {
                            $Move: f.$Move,
                            $OriginalWidth: l,
                            $OriginalHeight: m
                        }),
                        v.$ZIndex = v.$ZIndex || 1,
                        p[b].push(v)
                })
            });
            z.reverse();
            d.a(z, function(f) {
                d.a(f, function(f) {
                    var e = f[0];
                    f = f[1];
                    var h = e + "," + f
                      , g = c;
                    if (f || e)
                        g = d.Z(c);
                    d.K(g, q[h]);
                    d.kb(g, "hidden");
                    d.B(g, "absolute");
                    b.pe(g);
                    u[h] = g;
                    d.u(g, !B)
                })
            })
        }
        function M() {
            var b = 0;
            q.call(this, 0, B);
            this.Ub = function(d, c) {
                c - b > I && (b = c,
                D && D.dc(c),
                w && w.dc(c))
            }
            ;
            this.yc = G
        }
        var J = this, B, w, D, H = 0, x = g.$TransitionsOrder, G, I = 8;
        J.le = function() {
            var b, d = g.$Transitions;
            b = d.length;
            b = x ? H++ % b : k.floor(k.random() * b);
            d[b] && (d[b].ob = b);
            return d[b]
        }
        ;
        J.ge = function(d, e, h, g, n) {
            G = n;
            n = A(n, I);
            e = g.zd;
            var l = h.zd;
            e["no-image"] = !g.Mb;
            l["no-image"] = !h.Mb;
            h = e;
            g = l;
            var m = n
              , t = n.$Brother || A({}, I);
            n.$SlideOut || (h = l,
            g = e);
            n = t.$Shift || 0;
            w = new V(b,g,t,k.max(n - t.$Interval, 0),c,f);
            D = new V(b,h,m,k.max(t.$Interval - n, 0),c,f);
            w.dc(0);
            D.dc(0);
            B = k.max(w.vd, D.vd);
            J.ob = d
        }
        ;
        J.tb = function() {
            b.tb();
            D = w = h
        }
        ;
        J.Je = function() {
            var b = h;
            D && (b = new M);
            return b
        }
        ;
        if (d.fb() || d.Dd() || l && 537 > d.lf())
            I = 16;
        m.call(J);
        q.call(J, -1E7, 1E7)
    }
    ;
    var u = c.$JssorSlider$ = function(f, t) {
        function L() {
            var b = this;
            q.call(b, -1E8, 2E8);
            b.Le = function() {
                var d = b.qb()
                  , c = k.floor(d)
                  , f = K(c)
                  , d = d - k.floor(d);
                return {
                    ob: f,
                    Xe: c,
                    Db: d
                }
            }
            ;
            b.Ub = function(b, d) {
                var c = k.floor(d);
                c != d && d > b && c++;
                X(c, e);
                C.l(u.$EVT_POSITION_CHANGE, K(d), K(b), d, b)
            }
        }
        function Bb() {
            var b = this;
            q.call(b, 0, 0, {
                pd: P
            });
            d.a(pa, function(d) {
                na & 1 && d.Ae(P);
                b.rc(d);
                d.$Shift(Wa / qb)
            })
        }
        function ya() {
            var b = yb.$Elmt;
            q.call(this, -1, 2, {
                $Easing: p.$EaseLinear,
                Be: {
                    Db: J
                },
                pd: P
            }, b, {
                Db: 1
            }, {
                Db: -2
            });
            this.Yb = b
        }
        function pb(b, d) {
            var c = this, f, g, k, l, m;
            q.call(c, -1E8, 2E8, {
                Fc: 100
            });
            c.Qc = function() {
                Fa = e;
                Na = h;
                C.l(u.$EVT_SWIPE_START, K(ia.W()), ia.W())
            }
            ;
            c.Kc = function() {
                l = Fa = n;
                var b = ia.Le();
                C.l(u.$EVT_SWIPE_END, K(ia.W()), ia.W());
                if (!b.Db) {
                    var b = b.Xe
                      , d = Q;
                    ma = 0;
                    F(b);
                    C.l(u.$EVT_PARK, K(b), d)
                }
            }
            ;
            c.Ub = function(b, d) {
                var c;
                l ? c = m : (c = g,
                k && (c = z.$SlideEasing(d / k) * (g - f) + f));
                ia.D(c)
            }
            ;
            c.Ob = function(b, d, e, h) {
                f = b;
                g = d;
                k = e;
                ia.D(b);
                c.D(0);
                c.Lc(e, h)
            }
            ;
            c.ve = function(b) {
                l = e;
                m = b;
                c.$Play(b, h, e)
            }
            ;
            c.ue = function(b) {
                m = b
            }
            ;
            ia = new L;
            ia.wb(b);
            ia.wb(d)
        }
        function Ha(b, c) {
            function f(c) {
                x && x.Cd();
                A(b, c, 0);
                M = e;
                x = new ta.$Class(b,ta,d.rg(d.j(b, "idle")) || Db);
                x.D(0)
            }
            function g(b, f, h) {
                if (!I && (I = e,
                D && h)) {
                    var k = h.width;
                    h = h.height;
                    var l = k
                      , m = h;
                    k && h && z.$FillMode && (z.$FillMode & 3 && (!(z.$FillMode & 4) || k > za || h > Aa) && (m = n,
                    l = za / Aa * h / k,
                    z.$FillMode & 1 ? m = 1 < l : z.$FillMode & 2 && (m = 1 > l),
                    l = m ? k * Aa / h : za,
                    m = m ? Aa : h * za / k),
                    d.k(D, l),
                    d.m(D, m),
                    d.z(D, (Aa - m) / 2),
                    d.A(D, (za - l) / 2));
                    d.B(D, "absolute");
                    C.l(u.$EVT_LOAD_END, c)
                }
                d.Q(f);
                b && b(y)
            }
            function l(b, d, f, e) {
                e == Na && Q == c && Ea && !Cb && (e = K(b),
                qa.ge(e, c, d, y, f),
                d.Ye(),
                Oa.$Shift(e - Oa.jc() - 1),
                Oa.D(e),
                ka.Ob(b, b, 0))
            }
            function t(d) {
                d == Na && Q == c && (E || (d = h,
                qa && (qa.ob == c ? d = qa.Je() : qa.tb()),
                x.sc < ta.sc && f(),
                E = new V(b,c,d,x),
                E.Fd(L)),
                !E.$IsPlaying() && E.tc())
            }
            function p(b, f, e) {
                b == c ? (b != f ? pa[f] && pa[f].De() : !e && E && E.Ke(),
                L && L.$Enable(),
                b = Na = d.M(),
                y.xb(d.E(h, t, b))) : (f = k.min(c, b),
                b = k.max(c, b),
                b = k.min(b - f, f + P - b),
                f = Z + z.$LazyLoading - 1,
                (!F || b <= f) && y.xb())
            }
            function r() {
                L = R.pInstance;
                E && E.Fd(L)
            }
            function A(b, c, f) {
                if (!d.v(b, "jssor-slider")) {
                    M || ("IMG" == b.tagName && (H.push(b),
                    d.v(b, "src") || (F = e,
                    b["display-origin"] = d.T(b),
                    d.Q(b))),
                    d.fb() && d.F(b, (d.F(b) || 0) + 1));
                    var h = d.Ab(b);
                    d.a(h, function(h) {
                        var g = h.tagName
                          , k = d.j(h, "u");
                        "player" != k || R || (R = h,
                        R.pInstance ? r() : d.c(R, "dataavailable", r));
                        if ("caption" == k)
                            c ? (d.Ic(h, d.j(h, "to")),
                            d.zf(h, d.j(h, "bf")),
                            d.j(h, "3d") && d.yf(h, "preserve-3d")) : d.Nd() || (g = d.Z(h, n, e),
                            d.Vb(g, h, b),
                            d.zb(h, b),
                            h = g,
                            c = e);
                        else if (!M && !f && !D) {
                            if ("A" == g) {
                                if (D = "image" == d.j(h, "u") ? d.Jg(h, "IMG") : d.C(h, "image", e))
                                    G = h,
                                    d.T(G, "block"),
                                    d.K(G, sa),
                                    B = d.Z(G, e),
                                    d.B(G, "relative"),
                                    d.yb(B, 0),
                                    d.ab(B, "backgroundColor", "#000")
                            } else
                                "IMG" == g && "image" == d.j(h, "u") && (D = h);
                            D && (D.border = 0,
                            d.K(D, sa))
                        }
                        A(h, c, f + 1)
                    })
                }
            }
            var y = this, x, w, v, D, H = [], G, B, N, I, F, M, E, R, L;
            q.call(y, -Z, Z + 1, {});
            y.xb = function(b, f) {
                f = f || v;
                H.length && !I ? (d.u(f),
                N || (N = e,
                C.l(u.$EVT_LOAD_START, c),
                d.a(H, function(b) {
                    d.v(b, "src") || (b.src = d.j(b, "src2"),
                    d.T(b, b["display-origin"]))
                })),
                d.af(H, D, d.E(h, g, b, f))) : g(b, f)
            }
            ;
            y.Sd = function() {
                var b = c;
                0 > z.$AutoPlaySteps && (b -= P);
                b += z.$AutoPlaySteps * Ta;
                na & 2 && (b = K(b));
                na & 1 || Va || (b = k.max(0, k.min(b, P - Z)));
                if (b != c) {
                    if (qa) {
                        var f = qa.le(P);
                        if (f) {
                            var e = Na = d.M()
                              , g = pa[K(b)];
                            return g.xb(d.E(h, l, b, g, f, e), v)
                        }
                    }
                    Y(b)
                }
            }
            ;
            y.Bc = function() {
                p(c, c, e)
            }
            ;
            y.De = function() {
                L && L.$Quit();
                L && L.$Disable();
                y.Hc();
                E && E.de();
                E = h;
                f()
            }
            ;
            y.Ye = function() {
                d.Q(b)
            }
            ;
            y.Hc = function() {
                d.u(b)
            }
            ;
            y.fe = function() {
                L && L.$Enable()
            }
            ;
            y.nc = function(b, d) {
                J(w, Z - d)
            }
            ;
            y.ob = c;
            m.call(y);
            d.xf(b, d.j(b, "p"));
            d.qf(b, d.j(b, "po"));
            var X = d.C(b, "thumb", e);
            X && (y.re = d.Z(X),
            d.Q(X));
            d.u(b);
            v = d.Z(Ca);
            d.F(v, 1E3);
            d.c(b, "click", function(b) {
                !Ma && C.l(u.$EVT_CLICK, c, b)
            });
            f(e);
            y.Mb = D;
            y.Pc = B;
            y.zd = b;
            y.Yb = w = b;
            d.J(w, v);
            C.$On(203, p);
            C.$On(28, function() {
                Q == c && E && E.pb()
            });
            C.$On(24, function() {
                Q == c && E && (E.pb(),
                L && L.$Quit(),
                L && L.$Disable(),
                E.fd())
            })
        }
        function V(b, c, f, h) {
            function g() {
                d.qc(Ga);
                vb && y && v.Pc && d.J(Ga, v.Pc);
                d.u(Ga, !y && v.Mb)
            }
            function k() {
                m.tc()
            }
            function l(b) {
                w = b;
                m.pb();
                m.tc()
            }
            var m = this, t, p, r, A, y, x, w, v = pa[c];
            q.call(m, 0, 0);
            m.tc = function() {
                var b = m.qb();
                if (!oa && !Fa && !w && Q == c) {
                    b || (t && !y && (y = e,
                    m.fd(e),
                    C.l(u.$EVT_SLIDESHOW_START, c, 0, 0, t, A)),
                    g());
                    var d, f = u.$EVT_STATE_CHANGE;
                    b != A && (d = b == r ? A : b == p ? r : b ? m.Hd() : p);
                    C.l(f, c, b, 0, p, r, A);
                    f = Ea && (!ua || va);
                    b == A ? (r == A || ua & 12) && !f || v.Sd() : (f || b != r) && m.Lc(d, k)
                }
            }
            ;
            m.Ke = function() {
                r == A && r == m.qb() && m.D(p)
            }
            ;
            m.de = function() {
                qa && qa.ob == c && qa.tb();
                var b = m.qb();
                b < A && C.l(u.$EVT_STATE_CHANGE, c, -b - 1, 0, p, r, A)
            }
            ;
            m.fd = function(b) {
                f && d.kb(Ua, b && f.yc.$Outside ? "" : "hidden")
            }
            ;
            m.nc = function(b, d) {
                y && d >= t && (y = n,
                g(),
                v.Hc(),
                qa.tb(),
                C.l(u.$EVT_SLIDESHOW_END, c, 0, 0, t, A));
                C.l(u.$EVT_PROGRESS_CHANGE, c, d, 0, p, r, A)
            }
            ;
            m.Fd = function(b) {
                b && !x && (x = b,
                b.$On($JssorPlayer$.se, l))
            }
            ;
            f && m.rc(f);
            t = m.Zb();
            m.rc(h);
            p = t + h.bd;
            r = t + h.hd;
            A = m.Zb()
        }
        function M(b, c, f) {
            d.A(b, c);
            d.z(b, f)
        }
        function J(b, d) {
            var c = 0 < ma ? ma : Ia;
            M(b, db * d * (c & 1), eb * d * (c >> 1 & 1))
        }
        function B() {
            kb = Fa;
            zb = ka.Hd();
            xa = ia.W()
        }
        function w() {
            B();
            if (oa || !va && ua & 12)
                ka.pb(),
                C.l(u.gg)
        }
        function D(b) {
            if (!(oa || !va && ua & 12 || ka.$IsPlaying())) {
                var d = ia.W()
                  , c = k.ceil(xa);
                b && k.abs(wa) >= z.$MinDragOffsetToSlide && (c = k.ceil(d),
                c += Xa);
                na & 1 || (c = k.min(P - Z, k.max(c, 0)));
                b = k.abs(c - d);
                b = 1 - k.pow(1 - b, 5);
                !Ma && kb ? ka.Oe(zb) : d == c ? (cb.fe(),
                cb.Bc()) : ka.Ob(d, c, b * wb)
            }
        }
        function H(b) {
            !d.j(d.mc(b), "nodrag") && d.Pb(b)
        }
        function x(b) {
            G(b, 1)
        }
        function G(c, f) {
            c = d.Id(c);
            var g = d.mc(c);
            if (g = !Da && !d.j(g, "nodrag")) {
                var g = u.Zc || 0
                  , k = Ra;
                Ya && k & 1 && (k &= 1);
                u.Zc |= k;
                g = Da = k & ~g
            }
            !g || f && 1 != c.touches.length || (oa = e,
            gb = n,
            Na = h,
            d.c(b, f ? "touchmove" : "mousemove", I),
            d.M(),
            Ma = 0,
            w(),
            kb || (ma = 0),
            f ? (g = c.touches[0],
            ib = g.clientX,
            jb = g.clientY) : (g = d.Ed(c),
            ib = g.x,
            jb = g.y),
            Xa = Za = wa = 0,
            C.l(u.$EVT_DRAG_START, K(xa), xa, c))
        }
        function I(b) {
            if (oa) {
                b = d.Id(b);
                var c;
                if ("mousemove" != b.type) {
                    var f = b.touches[0];
                    c = {
                        x: f.clientX,
                        y: f.clientY
                    }
                } else
                    c = d.Ed(b);
                if (c && (f = c.x - ib,
                c = c.y - jb,
                k.floor(xa) != xa && (ma = ma || Ia & Da),
                !f && !c || ma || (ma = 3 == Da ? k.abs(c) > k.abs(f) ? 2 : 1 : Da,
                Ya && 1 == ma && 3 < k.abs(c) - k.abs(f) && (gb = e)),
                ma)) {
                    var h = eb;
                    1 == ma && (c = f,
                    h = db);
                    if (!(na & 1)) {
                        if (0 < c) {
                            var f = h * Q
                              , g = c - f;
                            0 < g && (c = f + 5 * k.sqrt(g))
                        }
                        0 > c && (f = h * (P - Z - Q),
                        g = -c - f,
                        0 < g && (c = -f - 5 * k.sqrt(g)))
                    }
                    -2 > wa - Za ? Xa = 0 : 2 < wa - Za && (Xa = -1);
                    Za = wa;
                    wa = c;
                    lb = xa - wa / h / (Sa || 1);
                    wa && ma && !gb && (d.Pb(b),
                    Fa ? ka.ue(lb) : ka.ve(lb))
                }
            }
        }
        function v() {
            Da && (u.Zc &= ~Ra,
            Da = 0);
            if (oa) {
                oa = n;
                d.M();
                d.R(b, "mousemove", I);
                d.R(b, "touchmove", I);
                Ma = wa;
                ka.pb();
                var c = ia.W();
                C.l(u.$EVT_DRAG_END, K(c), c, K(xa), xa);
                ua & 12 && B();
                D(e)
            }
        }
        function E(b) {
            if (Ma) {
                d.rf(b);
                for (var c = d.mc(b); c && U !== c; ) {
                    "A" == c.tagName && d.Pb(b);
                    try {
                        c = c.parentNode
                    } catch (f) {
                        break
                    }
                }
            }
        }
        function F(b) {
            pa[Q];
            Q = K(b);
            cb = pa[Q];
            X(b);
            return Q
        }
        function X(b, c) {
            bb = b;
            d.a(La, function(d) {
                d.Ec(K(b), b, c)
            })
        }
        function ea() {
            var b = d.jb();
            d.K(b, sa);
            d.B(b, "absolute");
            return b
        }
        function K(b) {
            return (b % P + P) % P
        }
        function R(b, d) {
            d && (na ? na & 2 && (b = K(b + bb),
            d = n) : (b = k.min(k.max(b + bb, 0), P - Z),
            d = n));
            Y(b, z.$SlideDuration, d)
        }
        function fa() {
            d.a(La, function(b) {
                b.gc(b.Nb.$ChanceToShow <= va)
            })
        }
        function aa() {
            va || (va = 1,
            fa(),
            oa || (ua & 12 && D(),
            ua & 3 && pa[Q].Bc()))
        }
        function S() {
            va && (va = 0,
            fa(),
            !oa && ua & 12 && w())
        }
        function O() {
            sa = {
                S: za,
                O: Aa,
                $Top: 0,
                $Left: 0
            };
            d.a(ra, function(b) {
                d.K(b, sa);
                d.B(b, "absolute");
                d.kb(b, "hidden");
                d.Q(b)
            });
            d.K(Ca, sa)
        }
        function Y(b, d, c) {
            if (xb && (!(oa || !va && ua & 12) || z.$NaviQuitDrag)) {
                Fa = e;
                oa = n;
                ka.pb();
                d == l && (d = wb);
                var f = mb.qb()
                  , h = b;
                c && (h = f + b,
                h = 0 < b ? k.ceil(h) : k.floor(h));
                na & 2 && (h = K(h));
                na & 1 || (h = k.max(0, k.min(h, P - Z)));
                b = (h - f) % P;
                h = f + b;
                b = f == h ? 0 : d * k.abs(b);
                b = k.min(b, d * Z * 1.5);
                ka.Ob(f, h, b || 1)
            }
        }
        function ca() {
            return d.k(W || f)
        }
        function la() {
            return d.m(W || f)
        }
        function ja(c, e) {
            if (c == l)
                return d.k(f);
            if (!W) {
                var h = d.jb(b);
                d.ad(h, d.ad(f));
                d.ac(h, d.ac(f));
                d.T(h, "block");
                d.B(h, "relative");
                d.z(h, 0);
                d.A(h, 0);
                d.kb(h, "visible");
                W = d.jb(b);
                d.B(W, "absolute");
                d.z(W, 0);
                d.A(W, 0);
                d.k(W, d.k(f));
                d.m(W, d.m(f));
                d.Ic(W, "0 0");
                d.J(W, h);
                var g = d.Ab(f);
                d.J(f, W);
                d.ab(f, "backgroundImage", "");
                d.a(g, function(b) {
                    d.J(d.j(b, "noscale") ? f : h, b);
                    d.j(b, "autocenter") && Ab.push(b)
                })
            }
            Sa = c / (e ? d.m : d.k)(W);
            d.pf(W, Sa);
            var g = e ? Sa * ca() : c
              , k = e ? c : Sa * la();
            d.k(f, g);
            d.m(f, k);
            d.a(Ab, function(b) {
                var c = d.zc(d.j(b, "autocenter"));
                d.wg(b, c)
            })
        }
        var C = this;
        C.$PlayTo = Y;
        C.$GoTo = function(b) {
            ia.D(F(b))
        }
        ;
        C.$Next = function() {
            Y(1, void 0, e)
        }
        ;
        C.$Prev = function() {
            Y(-1, void 0, e)
        }
        ;
        C.$Pause = function() {
            Ea = n
        }
        ;
        C.$Play = function() {
            Ea || (Ea = e,
            pa[Q] && pa[Q].Bc())
        }
        ;
        C.$SetSlideshowTransitions = function(b) {
            z.$SlideshowOptions.$Transitions = b
        }
        ;
        C.$SetCaptionTransitions = function(b) {
            ta.$Transitions = b;
            ta.sc = d.M()
        }
        ;
        C.$SlidesCount = function() {
            return ra.length
        }
        ;
        C.$CurrentIndex = function() {
            return Q
        }
        ;
        C.$IsAutoPlaying = function() {
            return Ea
        }
        ;
        C.$IsDragging = function() {
            return oa
        }
        ;
        C.$IsSliding = function() {
            return Fa
        }
        ;
        C.$IsMouseOver = function() {
            return !va
        }
        ;
        C.$LastDragSucceded = function() {
            return Ma
        }
        ;
        C.$OriginalWidth = C.$GetOriginalWidth = ca;
        C.$OriginalHeight = C.$GetOriginalHeight = la;
        C.$ScaleHeight = C.$GetScaleHeight = function(b) {
            if (b == l)
                return d.m(f);
            ja(b, e)
        }
        ;
        C.$ScaleWidth = C.$SetScaleWidth = C.$GetScaleWidth = ja;
        C.kd = function(b) {
            var d = k.ceil(K(Wa / qb))
              , c = K(b - Q + d);
            c > Z ? b - Q > P / 2 ? b -= P : b - Q <= -P / 2 && (b += P) : b = Q + c - d;
            return b
        }
        ;
        m.call(C);
        C.$Elmt = f = d.gb(f);
        var z = d.o({
            $FillMode: 0,
            $LazyLoading: 1,
            $ArrowKeyNavigation: 1,
            $StartIndex: 0,
            $AutoPlay: n,
            $Loop: 1,
            $HWA: e,
            $NaviQuitDrag: e,
            $AutoPlaySteps: 1,
            $AutoPlayInterval: 3E3,
            $PauseOnHover: 1,
            $SlideDuration: 500,
            $SlideEasing: p.$EaseOutQuad,
            $MinDragOffsetToSlide: 20,
            $SlideSpacing: 0,
            $Cols: 1,
            $Align: 0,
            $UISearchMode: 1,
            $PlayOrientation: 1,
            $DragOrientation: 1
        }, t);
        z.$HWA = z.$HWA && d.nf();
        z.$Idle != l && (z.$AutoPlayInterval = z.$Idle);
        z.$ParkingPosition != l && (z.$Align = z.$ParkingPosition);
        var Ia = z.$PlayOrientation & 3
          , Ta = (z.$PlayOrientation & 4) / -4 || 1
          , r = z.$SlideshowOptions
          , ta = d.o({
            $Class: g,
            $PlayInMode: 1,
            $PlayOutMode: 1,
            $HWA: z.$HWA
        }, z.$CaptionSliderOptions);
        ta.$Transitions = ta.$Transitions || ta.$CaptionTransitions;
        var Ba = z.$BulletNavigatorOptions, da = z.$ArrowNavigatorOptions, T = z.$ThumbnailNavigatorOptions, ga = !z.$UISearchMode, W, U = d.C(f, "slides", ga), Ca = d.C(f, "loading", ga) || d.jb(b), ba = d.C(f, "navigator", ga), ha = d.C(f, "arrowleft", ga), Ka = d.C(f, "arrowright", ga), Pa = d.C(f, "thumbnavigator", ga), Qa = d.k(U), fb = d.m(U), sa, ra = [], Ja = d.Ab(U);
        d.a(Ja, function(b) {
            "DIV" != b.tagName || d.j(b, "u") ? d.fb() && d.F(b, (d.F(b) || 0) + 1) : ra.push(b)
        });
        var Q = -1, bb, cb, P = ra.length, za = z.$SlideWidth || Qa, Aa = z.$SlideHeight || fb, rb = z.$SlideSpacing, db = za + rb, eb = Aa + rb, qb = Ia & 1 ? db : eb, Z = k.min(z.$Cols, P), Ua, ma, Da, gb, La = [], sb, tb, ub, vb, Cb, Ea, ua = z.$PauseOnHover, Db = z.$AutoPlayInterval, wb = z.$SlideDuration, hb, Va, Wa, xb = Z < P, na = xb ? z.$Loop : 0, Ra, Ma, va = 1, Fa, oa, Na, ib = 0, jb = 0, wa, Za, Xa, mb, ia, Oa, ka, yb = new function() {
            var b = ea();
            d.F(b, 0);
            d.ab(b, "pointerEvents", "none");
            this.$Elmt = b;
            this.pe = function(c) {
                d.J(b, c);
                d.u(b)
            }
            ;
            this.tb = function() {
                d.Q(b);
                d.qc(b)
            }
        }
        , Sa, Ab = [];
        if (P) {
            z.$HWA && (M = function(b, c, f) {
                d.Eb(b, {
                    $TranslateX: c,
                    $TranslateY: f
                })
            }
            );
            Ea = z.$AutoPlay;
            C.Nb = t;
            O();
            d.v(f, "jssor-slider", e);
            d.F(U, d.F(U) || 0);
            d.B(U, "absolute");
            Ua = d.Z(U, e);
            d.Vb(Ua, U);
            r && (vb = r.$ShowLink,
            hb = r.$Class,
            Va = 1 == Z && 1 < P && hb && (!d.Nd() || 8 <= d.Jd()));
            Wa = Va || Z >= P || !(na & 1) ? 0 : z.$Align;
            Ra = (1 < Z || Wa ? Ia : -1) & z.$DragOrientation;
            var nb = U, pa = [], qa, Ga, ob = d.kf(), Ya = ob.Wf, xa, kb, zb, lb;
            ob.nd && d.ab(nb, ob.nd, [h, "pan-y", "pan-x", "none"][Ra] || "");
            Oa = new ya;
            Va && (qa = new hb(yb,za,Aa,r,Ya));
            d.J(Ua, Oa.Yb);
            d.kb(U, "hidden");
            Ga = ea();
            d.ab(Ga, "backgroundColor", "#000");
            d.yb(Ga, 0);
            d.Vb(Ga, nb.firstChild, nb);
            for (var $a = 0; $a < ra.length; $a++) {
                var Eb = new Ha(ra[$a],$a);
                pa.push(Eb)
            }
            d.Q(Ca);
            mb = new Bb;
            ka = new pb(mb,Oa);
            Ra && (d.c(U, "mousedown", G),
            d.c(U, "touchstart", x),
            d.c(U, "dragstart", H),
            d.c(U, "selectstart", H),
            d.c(b, "mouseup", v),
            d.c(b, "touchend", v),
            d.c(b, "touchcancel", v),
            d.c(c, "blur", v));
            ua &= Ya ? 10 : 5;
            ba && Ba && (sb = new Ba.$Class(ba,Ba,ca(),la()),
            La.push(sb));
            da && ha && Ka && (da.$Loop = na,
            da.$Cols = Z,
            tb = new da.$Class(ha,Ka,da,ca(),la()),
            La.push(tb));
            Pa && T && (T.$StartIndex = z.$StartIndex,
            ub = new T.$Class(Pa,T),
            La.push(ub));
            d.a(La, function(b) {
                b.wc(P, pa, Ca);
                b.$On(A.Lb, R)
            });
            d.ab(f, "visibility", "visible");
            ja(ca());
            d.c(U, "click", E, e);
            d.c(f, "mouseout", d.Sb(aa, f));
            d.c(f, "mouseover", d.Sb(S, f));
            fa();
            z.$ArrowKeyNavigation && d.c(b, "keydown", function(b) {
                37 == b.keyCode ? Y(-z.$ArrowKeyNavigation, void 0, e) : 39 == b.keyCode && Y(z.$ArrowKeyNavigation, void 0, e)
            });
            var ab = z.$StartIndex;
            na & 1 || (ab = k.max(0, k.min(ab, P - Z)));
            ka.Ob(ab, ab, 0)
        }
    }
    ;
    u.$EVT_CLICK = 21;
    u.$EVT_DRAG_START = 22;
    u.$EVT_DRAG_END = 23;
    u.$EVT_SWIPE_START = 24;
    u.$EVT_SWIPE_END = 25;
    u.$EVT_LOAD_START = 26;
    u.$EVT_LOAD_END = 27;
    u.gg = 28;
    u.$EVT_POSITION_CHANGE = 202;
    u.$EVT_PARK = 203;
    u.$EVT_SLIDESHOW_START = 206;
    u.$EVT_SLIDESHOW_END = 207;
    u.$EVT_PROGRESS_CHANGE = 208;
    u.$EVT_STATE_CHANGE = 209;
    var A = {
        Lb: 1
    };
    c.$JssorBulletNavigator$ = function(b, c) {
        function f(b) {
            g.l(A.Lb, b * B)
        }
        var g = this;
        m.call(g);
        b = d.gb(b);
        var l, t, q, p, u = 0, J, B, w, D, H, x, G, I, v, E = [];
        g.$Elmt = b;
        g.Ec = function(b) {
            if (b != p) {
                var d = u
                  , c = k.floor(b / B);
                u = c;
                p = b;
                -1 != d && E[d].Jc(d == u);
                -1 != c && E[c].Jc(c == u)
            }
        }
        ;
        g.gc = function(c) {
            d.u(b, c)
        }
        ;
        var F;
        g.wc = function(c) {
            if (!F) {
                l = k.ceil(c / B);
                u = 0;
                c = I + D;
                var g = v + H
                  , n = k.ceil(l / w) - 1;
                t = I + c * (x ? w - 1 : n);
                q = v + g * (x ? n : w - 1);
                d.k(b, t);
                d.m(b, q);
                for (var m = 0; m < l; m++) {
                    var p = d.Dg();
                    d.Ig(p, m + 1);
                    p = d.Gc(G, "numbertemplate", p, e);
                    d.B(p, "absolute");
                    var A = m % (n + 1);
                    d.A(p, x ? m % w * c : c * A);
                    d.z(p, x ? g * A : k.floor(m / (n + 1)) * g);
                    d.J(b, p);
                    J.$ActionMode & 1 && d.c(p, "click", d.E(h, f, m));
                    J.$ActionMode & 2 && d.c(p, "mouseover", d.Sb(d.E(h, f, m), p));
                    E[m] = d.Tb(p)
                }
                F = e
            }
        }
        ;
        g.Nb = J = d.o({
            $SpacingX: 10,
            $SpacingY: 10,
            $Orientation: 1,
            $ActionMode: 1
        }, c);
        G = d.C(b, "prototype");
        I = d.k(G);
        v = d.m(G);
        d.zb(G, b);
        B = J.$Steps || 1;
        w = J.$Rows || 1;
        D = J.$SpacingX;
        H = J.$SpacingY;
        x = J.$Orientation - 1;
        J.$Scale == n && d.v(b, "noscale", e);
        J.$AutoCenter && d.v(b, "autocenter", J.$AutoCenter)
    }
    ;
    c.$JssorArrowNavigator$ = function(b, c, f) {
        function g(b) {
            l.l(A.Lb, b, e)
        }
        function k(e) {
            d.u(b, e || !f.$Loop && 0 == q);
            d.u(c, e || !f.$Loop && q >= p - f.$Cols);
            t = e
        }
        var l = this;
        m.call(l);
        var t, p, q, u, B;
        d.k(b);
        d.m(b);
        l.Ec = function(b, d, c) {
            c ? q = d : (q = b,
            k(t))
        }
        ;
        l.gc = k;
        var w;
        l.wc = function(f) {
            p = f;
            q = 0;
            w || (d.c(b, "click", d.E(h, g, -B)),
            d.c(c, "click", d.E(h, g, B)),
            d.Tb(b),
            d.Tb(c),
            w = e)
        }
        ;
        l.Nb = u = d.o({
            $Steps: 1
        }, f);
        B = u.$Steps;
        u.$Scale == n && (d.v(b, "noscale", e),
        d.v(c, "noscale", e));
        u.$AutoCenter && (d.v(b, "autocenter", u.$AutoCenter),
        d.v(c, "autocenter", u.$AutoCenter))
    }
    ;
    c.$JssorThumbnailNavigator$ = function(b, c) {
        function f(b, c) {
            function k(b) {
                if (b || !I.$LastDragSucceded())
                    b = B - c % B,
                    b = I.kd((c + b) / B - 1) * B + B - b,
                    g.l(A.Lb, b)
            }
            var l, n;
            this.ob = c;
            this.qd = function() {
                n.Jc(t == c)
            }
            ;
            l = b.re || b.Mb || d.jb();
            this.Yb = l = d.Gc(E, "thumbnailtemplate", l, e);
            n = d.Tb(l);
            p.$ActionMode & 1 && d.c(l, "click", d.E(h, k, 0));
            p.$ActionMode & 2 && d.c(l, "mouseover", d.Sb(d.E(h, k, 1), l))
        }
        var g = this, l, t, p, q = [], M, J, B, w, D, H, x, G, I, v, E;
        m.call(g);
        b = d.gb(b);
        g.Ec = function(b, d, c) {
            var f = t;
            t = b;
            -1 != f && q[f].qd();
            q[b].qd();
            !c && I.$PlayTo(I.kd(k.floor(d / B)))
        }
        ;
        g.gc = function(c) {
            d.u(b, c)
        }
        ;
        var F;
        g.wc = function(c, h) {
            if (!F) {
                l = c;
                k.ceil(l / B);
                t = -1;
                G = k.min(G, h.length);
                var g = p.$Orientation & 1
                  , m = H + (H + w) * (B - 1) * (1 - g)
                  , A = x + (x + D) * (B - 1) * g
                  , E = m + (m + w) * (G - 1) * g
                  , N = A + (A + D) * (G - 1) * (1 - g);
                d.B(v, "absolute");
                d.kb(v, "hidden");
                p.$AutoCenter & 1 && d.A(v, (M - E) / 2);
                p.$AutoCenter & 2 && d.z(v, (J - N) / 2);
                d.k(v, E);
                d.m(v, N);
                var O = [];
                d.a(h, function(b, c) {
                    var e = new f(b,c)
                      , h = e.Yb
                      , l = k.floor(c / B)
                      , n = c % B;
                    d.A(h, (H + w) * n * (1 - g));
                    d.z(h, (x + D) * n * g);
                    O[l] || (O[l] = d.jb(),
                    d.J(v, O[l]));
                    d.J(O[l], h);
                    q.push(e)
                });
                m = d.o({
                    $AutoPlay: n,
                    $NaviQuitDrag: n,
                    $SlideWidth: m,
                    $SlideHeight: A,
                    $SlideSpacing: w * g + D * (1 - g),
                    $MinDragOffsetToSlide: 12,
                    $SlideDuration: 200,
                    $PauseOnHover: 1,
                    $PlayOrientation: p.$Orientation,
                    $DragOrientation: p.$NoDrag || p.$DisableDrag ? 0 : p.$Orientation
                }, p);
                I = new u(b,m);
                F = e
            }
        }
        ;
        g.Nb = p = d.o({
            $SpacingX: 0,
            $SpacingY: 0,
            $Cols: 1,
            $Orientation: 1,
            $AutoCenter: 3,
            $ActionMode: 1
        }, c);
        M = d.k(b);
        J = d.m(b);
        v = d.C(b, "slides", e);
        E = d.C(v, "prototype");
        H = d.k(E);
        x = d.m(E);
        d.zb(E, v);
        B = p.$Rows || 1;
        w = p.$SpacingX;
        D = p.$SpacingY;
        G = p.$Cols;
        p.$Scale == n && d.v(b, "noscale", e)
    }
    ;
    c.$JssorCaptionSlideo$ = function(b, c, h) {
        function g(b, c) {
            var f = {};
            d.a(b, function(b, e) {
                var h = t[e];
                h && (d.Yc(b) ? b = g(b, c || "e" == e) : c && d.Hb(b) && (b = m[b]),
                f[h] = b)
            });
            return f
        }
        function k(b, c) {
            var f = []
              , e = d.Ab(b);
            d.a(e, function(b) {
                if ("caption" == d.j(b, "u")) {
                    var e = d.j(b, "t")
                      , e = p[d.zc(e)] || p[e];
                    f.push({
                        $Elmt: b,
                        yc: e
                    })
                }
                5 > c && (f = f.concat(k(b, c + 1)))
            });
            return f
        }
        function l(b, c, f) {
            d.a(c, function(c) {
                var h = d.o(e, {}, g(c))
                  , k = d.fc(h.$Easing);
                delete h.$Easing;
                h.$Left && (h.I = h.$Left,
                k.I = k.$Left,
                delete h.$Left);
                h.$Top && (h.H = h.$Top,
                k.H = k.$Top,
                delete h.$Top);
                c = new q(c.b,c.d,{
                    $Easing: k,
                    $OriginalWidth: f.S,
                    $OriginalHeight: f.O
                },b,f,h);
                u.wb(c);
                f = d.ze(f, h)
            });
            return f
        }
        var n = this, m, t = {}, p = c.$Transitions, u = new q(0,0);
        q.call(n, 0, 0);
        n.Cd = function() {
            n.D(-1, e)
        }
        ;
        m = [f.$Swing, f.$Linear, f.$InQuad, f.$OutQuad, f.$InOutQuad, f.$InCubic, f.$OutCubic, f.$InOutCubic, f.$InQuart, f.$OutQuart, f.$InOutQuart, f.$InQuint, f.$OutQuint, f.$InOutQuint, f.$InSine, f.$OutSine, f.$InOutSine, f.$InExpo, f.$OutExpo, f.$InOutExpo, f.$InCirc, f.$OutCirc, f.$InOutCirc, f.$InElastic, f.$OutElastic, f.$InOutElastic, f.$InBack, f.$OutBack, f.$InOutBack, f.$InBounce, f.$OutBounce, f.$InOutBounce, f.$GoBack, f.$InWave, f.$OutWave, f.$OutJump, f.$InJump];
        d.a({
            $Top: "y",
            $Left: "x",
            $Bottom: "m",
            $Right: "t",
            $Rotate: "r",
            $RotateX: "rX",
            $RotateY: "rY",
            $ScaleX: "sX",
            $ScaleY: "sY",
            $TranslateX: "tX",
            $TranslateY: "tY",
            $TranslateZ: "tZ",
            $SkewX: "kX",
            $SkewY: "kY",
            $Opacity: "o",
            $Easing: "e",
            $ZIndex: "i",
            $Clip: "c"
        }, function(b, d) {
            t[b] = d
        });
        (function(b) {
            d.a(b, function(b) {
                var c = b.$Elmt
                  , f = d.k(c)
                  , e = d.m(c)
                  , f = {
                    $Left: d.A(c),
                    $Top: d.z(c),
                    I: 0,
                    H: 0,
                    $Opacity: 1,
                    $ZIndex: d.F(c) || 0,
                    $Rotate: 0,
                    $RotateX: 0,
                    $RotateY: 0,
                    $ScaleX: 1,
                    $ScaleY: 1,
                    $TranslateX: 0,
                    $TranslateY: 0,
                    $TranslateZ: 0,
                    $SkewX: 0,
                    $SkewY: 0,
                    S: f,
                    O: e,
                    $Clip: {
                        $Top: 0,
                        $Right: f,
                        $Bottom: e,
                        $Left: 0
                    }
                };
                f.gd = f.$Left;
                f.Uc = f.$Top;
                l(c, b.yc, f)
            })
        })(k(b, 1));
        u.D(-1);
        b = [].concat((c.$Breaks || [])[d.zc(d.j(b, "b"))] || []);
        b.push({
            b: u.Zb(),
            d: b.length ? 0 : h
        });
        (function(b) {
            var c = u.jc()
              , f = 0;
            d.a(b, function(b, g) {
                var k = b = d.o({
                    d: h
                }, b)
                  , l = f
                  , m = k.b - c;
                m && (m = new q(c,m),
                m.wb(u, e),
                m.$Shift(l),
                n.wb(m));
                n.Fe(k.d);
                c = b.b;
                f += b.d;
                g && 2 != b.t || (n.bd = c,
                n.hd = c + b.d)
            })
        })(b);
        n.D(-1)
    }
})(window, document, Math, null , !0, !1);
(function(c) {
    var b = {
        cache: {},
        support: {},
        objects: {},
        init: function(b) {
            return this.each(function() {
                c(this).unbind("click.lightcase").bind("click.lightcase", function(h) {
                    h.preventDefault();
                    c(this).lightcase("start", b)
                })
            })
        },
        start: function(k) {
            b.origin = lightcase.origin = this;
            b.settings = lightcase.settings = c.extend(!0, {
                idPrefix: "lightcase-",
                classPrefix: "lightcase-",
                attrPrefix: "lc-",
                transition: "elastic",
                transitionIn: null ,
                transitionOut: null ,
                cssTransitions: !0,
                speedIn: 250,
                speedOut: 250,
                maxWidth: 800,
                maxHeight: 500,
                forceWidth: !1,
                forceHeight: !1,
                liveResize: !0,
                fullScreenModeForMobile: !0,
                mobileMatchExpression: /(iphone|ipod|ipad|android|blackberry|symbian)/,
                disableShrink: !1,
                shrinkFactor: .75,
                overlayOpacity: .9,
                slideshow: !1,
                timeout: 5E3,
                swipe: !0,
                useKeys: !0,
                useCategories: !0,
                navigateEndless: !0,
                closeOnOverlayClick: !0,
                title: null ,
                caption: null ,
                showTitle: !0,
                showCaption: !0,
                showSequenceInfo: !0,
                inline: {
                    width: "auto",
                    height: "auto"
                },
                ajax: {
                    width: "auto",
                    height: "auto",
                    type: "get",
                    dataType: "html",
                    data: {}
                },
                iframe: {
                    width: 800,
                    height: 500,
                    frameborder: 0
                },
                flash: {
                    width: 400,
                    height: 205,
                    wmode: "transparent"
                },
                video: {
                    width: 400,
                    height: 225,
                    poster: "",
                    preload: "auto",
                    controls: !0,
                    autobuffer: !0,
                    autoplay: !0,
                    loop: !1
                },
                attr: "data-rel",
                href: null ,
                type: null ,
                typeMapping: {
                    image: "jpg,jpeg,gif,png,bmp",
                    flash: "swf",
                    video: "mp4,mov,ogv,ogg,webm",
                    iframe: "html,php",
                    ajax: "json,txt",
                    inline: "#"
                },
                errorMessage: function() {
                    return '<p class="' + b.settings.classPrefix + 'error">' + b.settings.labels.errorMessage + "</p>"
                },
                labels: {
                    errorMessage: "Source could not be found...",
                    "sequenceInfo.of": " of ",
                    close: "Close",
                    "navigator.prev": "Prev",
                    "navigator.next": "Next",
                    "navigator.play": "Play",
                    "navigator.pause": "Pause"
                },
                markup: function() {
                    c("body").append(b.objects.overlay = c('<div id="' + b.settings.idPrefix + 'overlay"></div>'), b.objects.loading = c('<div id="' + b.settings.idPrefix + 'loading" class="' + b.settings.classPrefix + 'icon-spin"></div>'), b.objects["case"] = c('<div id="' + b.settings.idPrefix + 'case" aria-hidden="true" role="dialog"></div>'));
                    b.objects["case"].after(b.objects.nav = c('<div id="' + b.settings.idPrefix + 'nav"></div>'));
                    b.objects.nav.append(b.objects.close = c('<a href="#" class="' + b.settings.classPrefix + 'icon-close"><span>' + b.settings.labels.close + "</span></a>"), b.objects.prev = c('<a href="#" class="' + b.settings.classPrefix + 'icon-prev"><span>' + b.settings.labels["navigator.prev"] + "</span></a>").hide(), b.objects.next = c('<a href="#" class="' + b.settings.classPrefix + 'icon-next"><span>' + b.settings.labels["navigator.next"] + "</span></a>").hide(), b.objects.play = c('<a href="#" class="' + b.settings.classPrefix + 'icon-play"><span>' + b.settings.labels["navigator.play"] + "</span></a>").hide(), b.objects.pause = c('<a href="#" class="' + b.settings.classPrefix + 'icon-pause"><span>' + b.settings.labels["navigator.pause"] + "</span></a>").hide());
                    b.objects["case"].append(b.objects.content = c('<div id="' + b.settings.idPrefix + 'content"></div>'), b.objects.info = c('<div id="' + b.settings.idPrefix + 'info"></div>'));
                    b.objects.content.append(b.objects.contentInner = c('<div class="' + b.settings.classPrefix + 'contentInner"></div>'));
                    b.objects.info.append(b.objects.sequenceInfo = c('<div id="' + b.settings.idPrefix + 'sequenceInfo"></div>'), b.objects.title = c('<h4 id="' + b.settings.idPrefix + 'title"></h4>'), b.objects.caption = c('<p id="' + b.settings.idPrefix + 'caption"></p>'))
                },
                onInit: {},
                onStart: {},
                onFinish: {},
                onClose: {},
                onCleanup: {}
            }, k);
            b._callHooks(b.settings.onInit);
            b.objectData = b._setObjectData(this);
            b._cacheScrollPosition();
            b._watchScrollInteraction();
            b._addElements();
            b._open();
            b.dimensions = b.getViewportDimensions()
        },
        get: function(c) {
            return b.objects[c]
        },
        getObjectData: function() {
            return b.objectData
        },
        _setObjectData: function(k) {
            k = c(k);
            k = {
                title: b.settings.title || k.attr(b._prefixAttributeName("title")) || k.attr("title"),
                caption: b.settings.caption || k.attr(b._prefixAttributeName("caption")) || k.children("img").attr("alt"),
                url: b._determineUrl(),
                requestType: b.settings.ajax.type,
                requestData: b.settings.ajax.data,
                requestDataType: b.settings.ajax.dataType,
                rel: k.attr(b._determineAttributeSelector()),
                type: b.settings.type || b._verifyDataType(b._determineUrl()),
                isPartOfSequence: b._isPartOfSequence(k.attr(b.settings.attr), ":"),
                isPartOfSequenceWithSlideshow: b._isPartOfSequence(k.attr(b.settings.attr), ":slideshow"),
                currentIndex: c(b._determineAttributeSelector()).index(k),
                sequenceLength: c(b._determineAttributeSelector()).length
            };
            k.sequenceInfo = k.currentIndex + 1 + b.settings.labels["sequenceInfo.of"] + k.sequenceLength;
            k.prevIndex = k.currentIndex - 1;
            k.nextIndex = k.currentIndex + 1;
            return k
        },
        _prefixAttributeName: function(c) {
            return "data-" + b.settings.attrPrefix + c
        },
        _determineLinkTarget: function() {
            return b.settings.href || c(b.origin).attr(b._prefixAttributeName("href")) || c(b.origin).attr("href")
        },
        _determineAttributeSelector: function() {
            var k = c(b.origin)
              , h = "";
            "undefined" !== typeof b.cache.selector ? h = b.cache.selector : !0 === b.settings.useCategories && k.attr(b._prefixAttributeName("categories")) ? (k = k.attr(b._prefixAttributeName("categories")).split(" "),
            c.each(k, function(c, k) {
                0 < c && (h += ",");
                h += "[" + b._prefixAttributeName("categories") + '~="' + k + '"]'
            })) : h = "[" + b.settings.attr + '="' + k.attr(b.settings.attr) + '"]';
            return b.cache.selector = h
        },
        _determineUrl: function() {
            var k = b._verifyDataUrl(b._determineLinkTarget()), h = 0, e = 0, n;
            c.each(k, function(c, k) {
                b._devicePixelRatio() >= k.density && k.density >= e && b._matchMedia()("screen and (min-width:" + k.width + "px)") && k.width >= h && (h = k.width,
                e = k.density,
                n = k.url)
            });
            return n
        },
        _normalizeUrl: function(b) {
            var c = /^\d+$/;
            return b.split(",").map(function(b) {
                var k = {
                    width: 0,
                    density: 0
                };
                b.trim().split(/\s+/).forEach(function(b, e) {
                    if (0 === e)
                        return k.url = b;
                    var g = b.substring(0, b.length - 1)
                      , p = b[b.length - 1]
                      , f = parseInt(g, 10)
                      , d = parseFloat(g);
                    "w" === p && c.test(g) ? k.width = f : "h" === p && c.test(g) ? k.height = f : "x" !== p || isNaN(d) || (k.density = d)
                });
                return k
            })
        },
        _isPartOfSequence: function(k, h) {
            var e = c("[" + b.settings.attr + '="' + k + '"]');
            return (new RegExp(h)).test(k) && 1 < e.length
        },
        isSlideshowEnabled: function() {
            return b.objectData.isPartOfSequence && (!0 === b.settings.slideshow || !0 === b.objectData.isPartOfSequenceWithSlideshow)
        },
        _loadContent: function() {
            b.cache.originalObject && b._restoreObject();
            b._createObject()
        },
        _createObject: function() {
            var k;
            switch (b.objectData.type) {
            case "image":
                k = c(new Image);
                k.attr({
                    src: b.objectData.url,
                    alt: b.objectData.title
                });
                break;
            case "inline":
                k = c('<div class="' + b.settings.classPrefix + 'inlineWrap"></div>');
                k.html(b._cloneObject(c(b.objectData.url)));
                c.each(b.settings.inline, function(c, e) {
                    k.attr(b._prefixAttributeName(c), e)
                });
                break;
            case "ajax":
                k = c('<div class="' + b.settings.classPrefix + 'inlineWrap"></div>');
                c.each(b.settings.ajax, function(c, e) {
                    "data" !== c && k.attr(b._prefixAttributeName(c), e)
                });
                break;
            case "flash":
                k = c('<embed src="' + b.objectData.url + '" type="application/x-shockwave-flash"></embed>');
                c.each(b.settings.flash, function(b, c) {
                    k.attr(b, c)
                });
                break;
            case "video":
                k = c("<video></video>");
                k.attr("src", b.objectData.url);
                c.each(b.settings.video, function(b, c) {
                    k.attr(b, c)
                });
                break;
            default:
                k = c("<iframe></iframe>"),
                k.attr({
                    src: b.objectData.url
                }),
                c.each(b.settings.iframe, function(b, c) {
                    k.attr(b, c)
                })
            }
            b._addObject(k);
            b._loadObject(k)
        },
        _addObject: function(c) {
            b.objects.contentInner.html(c);
            b._loading("start");
            b._callHooks(b.settings.onStart);
            !0 === b.settings.showSequenceInfo && b.objectData.isPartOfSequence ? (b.objects.sequenceInfo.html(b.objectData.sequenceInfo),
            b.objects.sequenceInfo.show()) : (b.objects.sequenceInfo.empty(),
            b.objects.sequenceInfo.hide());
            !0 === b.settings.showTitle && void 0 !== b.objectData.title && "" !== b.objectData.title ? (b.objects.title.html(b.objectData.title),
            b.objects.title.show()) : (b.objects.title.empty(),
            b.objects.title.hide());
            !0 === b.settings.showCaption && void 0 !== b.objectData.caption && "" !== b.objectData.caption ? (b.objects.caption.html(b.objectData.caption),
            b.objects.caption.show()) : (b.objects.caption.empty(),
            b.objects.caption.hide())
        },
        _loadObject: function(k) {
            switch (b.objectData.type) {
            case "inline":
                c(b.objectData.url) ? b._showContent(k) : b.error();
                break;
            case "ajax":
                c.ajax(c.extend({}, b.settings.ajax, {
                    url: b.objectData.url,
                    type: b.objectData.requestType,
                    dataType: b.objectData.requestDataType,
                    data: b.objectData.requestData,
                    success: function(c, e, n) {
                        "json" === b.objectData.requestDataType ? b.objectData.data = c : k.html(c);
                        b._showContent(k)
                    },
                    error: function(c, e, k) {
                        b.error()
                    }
                }));
                break;
            case "flash":
                b._showContent(k);
                break;
            case "video":
                "function" === typeof k.get(0).canPlayType || 0 === b.objects["case"].find("video").length ? b._showContent(k) : b.error();
                break;
            default:
                b.objectData.url ? (k.load(function() {
                    b._showContent(k)
                }),
                k.error(function() {
                    b.error()
                })) : b.error()
            }
        },
        error: function() {
            b.objectData.type = "error";
            var k = c('<div class="' + b.settings.classPrefix + 'inlineWrap"></div>');
            k.html(b.settings.errorMessage);
            b.objects.contentInner.html(k);
            b._showContent(b.objects.contentInner)
        },
        _calculateDimensions: function(c) {
            b._cleanupDimensions();
            var h = {
                objectWidth: c.attr("width") ? c.attr("width") : c.attr(b._prefixAttributeName("width")),
                objectHeight: c.attr("height") ? c.attr("height") : c.attr(b._prefixAttributeName("height"))
            };
            if (!b.settings.disableShrink)
                switch (h.maxWidth = parseInt(b.dimensions.windowWidth * b.settings.shrinkFactor),
                h.maxHeight = parseInt(b.dimensions.windowHeight * b.settings.shrinkFactor),
                h.maxWidth > b.settings.maxWidth && (h.maxWidth = b.settings.maxWidth),
                h.maxHeight > b.settings.maxHeight && (h.maxHeight = b.settings.maxHeight),
                h.differenceWidthAsPercent = parseInt(100 / h.maxWidth * h.objectWidth),
                h.differenceHeightAsPercent = parseInt(100 / h.maxHeight * h.objectHeight),
                b.objectData.type) {
                case "image":
                case "flash":
                case "video":
                    100 < h.differenceWidthAsPercent && h.differenceWidthAsPercent > h.differenceHeightAsPercent && (h.objectWidth = h.maxWidth,
                    h.objectHeight = parseInt(h.objectHeight / h.differenceWidthAsPercent * 100));
                    100 < h.differenceHeightAsPercent && h.differenceHeightAsPercent > h.differenceWidthAsPercent && (h.objectWidth = parseInt(h.objectWidth / h.differenceHeightAsPercent * 100),
                    h.objectHeight = h.maxHeight);
                    100 < h.differenceHeightAsPercent && h.differenceWidthAsPercent < h.differenceHeightAsPercent && (h.objectWidth = parseInt(h.maxWidth / h.differenceHeightAsPercent * h.differenceWidthAsPercent),
                    h.objectHeight = h.maxHeight);
                    break;
                case "error":
                    !isNaN(h.objectWidth) && h.objectWidth > h.maxWidth && (h.objectWidth = h.maxWidth);
                    break;
                default:
                    (isNaN(h.objectWidth) || h.objectWidth > h.maxWidth) && !b.settings.forceWidth && (h.objectWidth = h.maxWidth),
                    (isNaN(h.objectHeight) && "auto" !== h.objectHeight || h.objectHeight > h.maxHeight) && !b.settings.forceHeight && (h.objectHeight = h.maxHeight)
                }
            b.settings.forceWidth ? h.maxWidth = h.objectWidth : c.attr(b._prefixAttributeName("max-width")) && (h.maxWidth = c.attr(b._prefixAttributeName("max-width")));
            b.settings.forceHeight ? h.maxHeight = h.objectHeight : c.attr(b._prefixAttributeName("max-height")) && (h.maxHeight = c.attr(b._prefixAttributeName("max-height")));
            b._adjustDimensions(c, h)
        },
        _adjustDimensions: function(c, h) {
            c.css({
                width: h.objectWidth,
                height: h.objectHeight,
                "max-width": h.maxWidth,
                "max-height": h.maxHeight
            });
            b.objects.contentInner.css({
                width: c.outerWidth(),
                height: c.outerHeight(),
                "max-width": "100%"
            });
            b.objects["case"].css({
                width: b.objects.contentInner.outerWidth()
            });
            b.objects["case"].css({
                "margin-top": parseInt(-(b.objects["case"].outerHeight() / 2)),
                "margin-left": parseInt(-(b.objects["case"].outerWidth() / 2))
            })
        },
        _loading: function(c) {
            "start" === c ? (b.objects["case"].addClass(b.settings.classPrefix + "loading"),
            b.objects.loading.show()) : "end" === c && (b.objects["case"].removeClass(b.settings.classPrefix + "loading"),
            b.objects.loading.hide())
        },
        getViewportDimensions: function() {
            return {
                windowWidth: c(window).innerWidth(),
                windowHeight: c(window).innerHeight()
            }
        },
        _verifyDataUrl: function(c) {
            if (!c || void 0 === c || "" === c)
                return !1;
            -1 < c.indexOf("#") && (c = c.split("#"),
            c = "#" + c[c.length - 1]);
            return b._normalizeUrl(c.toString())
        },
        _verifyDataType: function(c) {
            var h = b.settings.typeMapping;
            if (!c)
                return !1;
            for (var e in h)
                if (h.hasOwnProperty(e))
                    for (var n = h[e].split(","), l = 0; l < n.length; l++) {
                        var m = n[l].toLowerCase()
                          , g = new RegExp(".(" + m + ")$","i")
                          , p = c.toLowerCase().split("?")[0].substr(-5);
                        if (!0 === g.test(p) || "inline" === e && -1 < c.indexOf(m))
                            return e
                    }
            return "iframe"
        },
        _addElements: function() {
            "undefined" !== typeof b.objects["case"] && c("#" + b.objects["case"].attr("id")).length || b.settings.markup()
        },
        _showContent: function(c) {
            b.objects["case"].attr(b._prefixAttributeName("type"), b.objectData.type);
            b.cache.object = c;
            b._calculateDimensions(c);
            b._callHooks(b.settings.onFinish);
            switch (b.settings.transitionIn) {
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollHorizontal":
            case "scrollVertical":
                b.transition.scroll(b.objects["case"], "in", b.settings.speedIn);
                b.transition.fade(b.objects.contentInner, "in", b.settings.speedIn);
                break;
            case "elastic":
                1 > b.objects["case"].css("opacity") && (b.transition.zoom(b.objects["case"], "in", b.settings.speedIn),
                b.transition.fade(b.objects.contentInner, "in", b.settings.speedIn));
            case "fade":
            case "fadeInline":
                b.transition.fade(b.objects["case"], "in", b.settings.speedIn);
                b.transition.fade(b.objects.contentInner, "in", b.settings.speedIn);
                break;
            default:
                b.transition.fade(b.objects["case"], "in", 0)
            }
            b._loading("end");
            b.isBusy = !1
        },
        _processContent: function() {
            b.isBusy = !0;
            switch (b.settings.transitionOut) {
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollVertical":
            case "scrollHorizontal":
                b.objects["case"].is(":hidden") ? (b.transition.fade(b.objects["case"], "out", 0, 0, function() {
                    b._loadContent()
                }),
                b.transition.fade(b.objects.contentInner, "out", 0)) : b.transition.scroll(b.objects["case"], "out", b.settings.speedOut, function() {
                    b._loadContent()
                });
                break;
            case "fade":
                b.objects["case"].is(":hidden") ? b.transition.fade(b.objects["case"], "out", 0, 0, function() {
                    b._loadContent()
                }) : b.transition.fade(b.objects["case"], "out", b.settings.speedOut, 0, function() {
                    b._loadContent()
                });
                break;
            case "fadeInline":
            case "elastic":
                b.objects["case"].is(":hidden") ? b.transition.fade(b.objects["case"], "out", 0, 0, function() {
                    b._loadContent()
                }) : b.transition.fade(b.objects.contentInner, "out", b.settings.speedOut, 0, function() {
                    b._loadContent()
                });
                break;
            default:
                b.transition.fade(b.objects["case"], "out", 0, 0, function() {
                    b._loadContent()
                })
            }
        },
        _handleEvents: function() {
            b._unbindEvents();
            b.objects.nav.children().not(b.objects.close).hide();
            b.isSlideshowEnabled() && (b.objects.nav.hasClass(b.settings.classPrefix + "paused") ? b._stopTimeout() : b._startTimeout());
            b.settings.liveResize && b._watchResizeInteraction();
            b.objects.close.click(function(c) {
                c.preventDefault();
                b.close()
            });
            !0 === b.settings.closeOnOverlayClick && b.objects.overlay.css("cursor", "pointer").click(function(c) {
                c.preventDefault();
                b.close()
            });
            !0 === b.settings.useKeys && b._addKeyEvents();
            if (b.objectData.isPartOfSequence && (b.objects.nav.attr(b._prefixAttributeName("ispartofsequence"), !0),
            b.objects.nav.data("items", b._setNavigation()),
            b.objects.prev.click(function(c) {
                c.preventDefault();
                !0 !== b.settings.navigateEndless && b.item.isFirst() || (b.objects.prev.unbind("click"),
                b.cache.action = "prev",
                b.objects.nav.data("items").prev.click(),
                b.isSlideshowEnabled() && b._stopTimeout())
            }),
            b.objects.next.click(function(c) {
                c.preventDefault();
                !0 !== b.settings.navigateEndless && b.item.isLast() || (b.objects.next.unbind("click"),
                b.cache.action = "next",
                b.objects.nav.data("items").next.click(),
                b.isSlideshowEnabled() && b._stopTimeout())
            }),
            b.isSlideshowEnabled() && (b.objects.play.click(function(c) {
                c.preventDefault();
                b._startTimeout()
            }),
            b.objects.pause.click(function(c) {
                c.preventDefault();
                b._stopTimeout()
            })),
            !0 === b.settings.swipe)) {
                if (c.isPlainObject(c.event.special.swipeleft))
                    b.objects["case"].on("swipeleft", function(c) {
                        c.preventDefault();
                        b.objects.next.click();
                        b.isSlideshowEnabled() && b._stopTimeout()
                    });
                if (c.isPlainObject(c.event.special.swiperight))
                    b.objects["case"].on("swiperight", function(c) {
                        c.preventDefault();
                        b.objects.prev.click();
                        b.isSlideshowEnabled() && b._stopTimeout()
                    })
            }
        },
        _addKeyEvents: function() {
            c(document).bind("keyup.lightcase", function(c) {
                if (!b.isBusy)
                    switch (c.keyCode) {
                    case 27:
                        b.objects.close.click();
                        break;
                    case 37:
                        b.objectData.isPartOfSequence && b.objects.prev.click();
                        break;
                    case 39:
                        b.objectData.isPartOfSequence && b.objects.next.click()
                    }
            })
        },
        _startTimeout: function() {
            b.objects.play.hide();
            b.objects.pause.show();
            b.cache.action = "next";
            b.objects.nav.removeClass(b.settings.classPrefix + "paused");
            b.timeout = setTimeout(function() {
                b.objects.nav.data("items").next.click()
            }, b.settings.timeout)
        },
        _stopTimeout: function() {
            b.objects.play.show();
            b.objects.pause.hide();
            b.objects.nav.addClass(b.settings.classPrefix + "paused");
            clearTimeout(b.timeout)
        },
        _setNavigation: function() {
            var k = c(b.cache.selector || b.settings.attr)
              , h = b.objectData.sequenceLength - 1
              , e = {
                prev: k.eq(b.objectData.prevIndex),
                next: k.eq(b.objectData.nextIndex)
            };
            0 < b.objectData.currentIndex ? b.objects.prev.show() : e.prevItem = k.eq(h);
            b.objectData.nextIndex <= h ? b.objects.next.show() : e.next = k.eq(0);
            !0 === b.settings.navigateEndless && (b.objects.prev.show(),
            b.objects.next.show());
            return e
        },
        item: {
            isFirst: function() {
                return 0 === b.objectData.currentIndex
            },
            isLast: function() {
                return b.objectData.currentIndex === b.objectData.sequenceLength - 1
            }
        },
        _cloneObject: function(c) {
            var h = c.clone()
              , e = c.attr("id");
            c.is(":hidden") ? (b._cacheObjectData(c),
            c.attr("id", b.settings.idPrefix + "temp-" + e).empty()) : h.removeAttr("id");
            return h.show()
        },
        isMobileDevice: function() {
            return navigator.userAgent.toLowerCase().match(b.settings.mobileMatchExpression) ? !0 : !1
        },
        isTransitionSupported: function() {
            var k = c("body").get(0), h = !1, e = {
                transition: "",
                WebkitTransition: "-webkit-",
                MozTransition: "-moz-",
                OTransition: "-o-",
                MsTransition: "-ms-"
            }, n;
            for (n in e)
                e.hasOwnProperty(n) && n in k.style && (b.support.transition = e[n],
                h = !0);
            return h
        },
        transition: {
            fade: function(c, h, e, n, l) {
                var m = "in" === h;
                h = {};
                var g = c.css("opacity")
                  , p = {};
                if (b.isOpen || !m)
                    h.opacity = g,
                    p.opacity = n ? n : m ? 1 : 0,
                    c.css(h).show(),
                    b.support.transitions ? (p[b.support.transition + "transition"] = e + "ms ease",
                    setTimeout(function() {
                        c.css(p);
                        setTimeout(function() {
                            c.css(b.support.transition + "transition", "");
                            !l || !b.isOpen && m || l()
                        }, e)
                    }, 15)) : (c.stop(),
                    c.animate(p, e, l))
            },
            scroll: function(c, h, e, n) {
                var l = "in" === h;
                h = l ? b.settings.transitionIn : b.settings.transitionOut;
                var m = "left"
                  , g = {}
                  , p = l ? "-50%" : "50%"
                  , f = {}
                  , d = l ? "50%" : "-50%";
                if (b.isOpen || !l) {
                    switch (h) {
                    case "scrollTop":
                        m = "top";
                        break;
                    case "scrollRight":
                        p = l ? "150%" : "50%";
                        d = l ? "50%" : "150%";
                        break;
                    case "scrollBottom":
                        m = "top";
                        p = l ? "150%" : "50%";
                        d = l ? "50%" : "150%";
                        break;
                    case "scrollHorizontal":
                        p = l ? "150%" : "50%";
                        d = l ? "50%" : "-50%";
                        break;
                    case "scrollVertical":
                        m = "top",
                        p = l ? "-50%" : "50%",
                        d = l ? "50%" : "150%"
                    }
                    if ("prev" === b.cache.action)
                        switch (h) {
                        case "scrollHorizontal":
                            p = l ? "-50%" : "50%";
                            d = l ? "50%" : "150%";
                            break;
                        case "scrollVertical":
                            p = l ? "150%" : "50%",
                            d = l ? "50%" : "-50%"
                        }
                    g.opacity = l ? 0 : 1;
                    g[m] = p;
                    f.opacity = l ? 1 : 0;
                    f[m] = d;
                    c.css(g).show();
                    b.support.transitions ? (f[b.support.transition + "transition"] = e + "ms ease",
                    setTimeout(function() {
                        c.css(f);
                        setTimeout(function() {
                            c.css(b.support.transition + "transition", "");
                            !n || !b.isOpen && l || n()
                        }, e)
                    }, 15)) : (c.stop(),
                    c.animate(f, e, n))
                }
            },
            zoom: function(c, h, e, n) {
                var l = "in" === h;
                h = {};
                var m = c.css("opacity")
                  , g = {}
                  , p = l ? "scale(1)" : "scale(0.75)";
                if (b.isOpen || !l)
                    h.opacity = m,
                    h[b.support.transition + "transform"] = l ? "scale(0.75)" : "scale(1)",
                    g.opacity = l ? 1 : 0,
                    c.css(h).show(),
                    b.support.transitions ? (g[b.support.transition + "transform"] = p,
                    g[b.support.transition + "transition"] = e + "ms ease",
                    setTimeout(function() {
                        c.css(g);
                        setTimeout(function() {
                            c.css(b.support.transition + "transform", "");
                            c.css(b.support.transition + "transition", "");
                            !n || !b.isOpen && l || n()
                        }, e)
                    }, 15)) : (c.stop(),
                    c.animate(g, e, n))
            }
        },
        _callHooks: function(k) {
            "object" === typeof k && c.each(k, function(c, e) {
                "function" === typeof e && e.call(b.origin)
            })
        },
        _cacheObjectData: function(k) {
            c.data(k, "cache", {
                id: k.attr("id"),
                content: k.html()
            });
            b.cache.originalObject = k
        },
        _restoreObject: function() {
            var k = c('[id^="' + b.settings.idPrefix + 'temp-"]');
            k.attr("id", c.data(b.cache.originalObject, "cache").id);
            k.html(c.data(b.cache.originalObject, "cache").content)
        },
        resize: function() {
            b.isOpen && (b.isSlideshowEnabled() && b._stopTimeout(),
            b.dimensions = b.getViewportDimensions(),
            b._calculateDimensions(b.cache.object))
        },
        _cacheScrollPosition: function() {
            var k = c(window)
              , h = c(document)
              , e = k.scrollTop()
              , n = k.scrollLeft();
            b.cache.scrollPosition = b.cache.scrollPosition || {};
            h.width() > k.width() && (b.cache.scrollPosition.left = n);
            h.height() > k.height() && (b.cache.scrollPosition.top = e)
        },
        _watchResizeInteraction: function() {
            c(window).resize(b.resize)
        },
        _unwatchResizeInteraction: function() {
            c(window).off("resize", b.resize)
        },
        _watchScrollInteraction: function() {
            c(window).scroll(b._cacheScrollPosition)
        },
        _unwatchScrollInteraction: function() {
            c(window).off("scroll", b._cacheScrollPosition)
        },
        _restoreScrollPosition: function() {
            c(window).scrollTop(parseInt(b.cache.scrollPosition.top)).scrollLeft(parseInt(b.cache.scrollPosition.left)).resize()
        },
        _switchToFullScreenMode: function() {
            b.settings.shrinkFactor = 1;
            b.settings.overlayOpacity = 1;
            c("html").addClass(b.settings.classPrefix + "fullScreenMode")
        },
        _open: function() {
            b.isOpen = !0;
            b.support.transitions = b.settings.cssTransitions ? b.isTransitionSupported() : !1;
            b.support.mobileDevice = b.isMobileDevice();
            b.support.mobileDevice && (c("html").addClass(b.settings.classPrefix + "isMobileDevice"),
            b.settings.fullScreenModeForMobile && b._switchToFullScreenMode());
            b.settings.transitionIn || (b.settings.transitionIn = b.settings.transition);
            b.settings.transitionOut || (b.settings.transitionOut = b.settings.transition);
            switch (b.settings.transitionIn) {
            case "fade":
            case "fadeInline":
            case "elastic":
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollVertical":
            case "scrollHorizontal":
                b.objects["case"].is(":hidden") && (b.objects.close.css("opacity", 0),
                b.objects.overlay.css("opacity", 0),
                b.objects["case"].css("opacity", 0),
                b.objects.contentInner.css("opacity", 0));
                b.transition.fade(b.objects.overlay, "in", b.settings.speedIn, b.settings.overlayOpacity, function() {
                    b.transition.fade(b.objects.close, "in", b.settings.speedIn);
                    b._handleEvents();
                    b._processContent()
                });
                break;
            default:
                b.transition.fade(b.objects.overlay, "in", 0, b.settings.overlayOpacity, function() {
                    b.transition.fade(b.objects.close, "in", 0);
                    b._handleEvents();
                    b._processContent()
                })
            }
            c("html").addClass(b.settings.classPrefix + "open");
            b.objects["case"].attr("aria-hidden", "false")
        },
        close: function() {
            b.isOpen = !1;
            b.isSlideshowEnabled() && (b._stopTimeout(),
            b.objects.nav.removeClass(b.settings.classPrefix + "paused"));
            b.objects.loading.hide();
            b._unbindEvents();
            b._unwatchResizeInteraction();
            b._unwatchScrollInteraction();
            c("html").removeClass(b.settings.classPrefix + "open");
            b.objects["case"].attr("aria-hidden", "true");
            b.objects.nav.children().hide();
            b._restoreScrollPosition();
            b._callHooks(b.settings.onClose);
            switch (b.settings.transitionOut) {
            case "fade":
            case "fadeInline":
            case "scrollTop":
            case "scrollRight":
            case "scrollBottom":
            case "scrollLeft":
            case "scrollHorizontal":
            case "scrollVertical":
                b.transition.fade(b.objects["case"], "out", b.settings.speedOut, 0, function() {
                    b.transition.fade(b.objects.overlay, "out", b.settings.speedOut, 0, function() {
                        b.cleanup()
                    })
                });
                break;
            case "elastic":
                b.transition.zoom(b.objects["case"], "out", b.settings.speedOut, function() {
                    b.transition.fade(b.objects.overlay, "out", b.settings.speedOut, 0, function() {
                        b.cleanup()
                    })
                });
                break;
            default:
                b.cleanup()
            }
        },
        _unbindEvents: function() {
            b.objects.overlay.unbind("click");
            c(document).unbind("keyup.lightcase");
            b.objects["case"].unbind("swipeleft").unbind("swiperight");
            b.objects.prev.unbind("click");
            b.objects.next.unbind("click");
            b.objects.play.unbind("click");
            b.objects.pause.unbind("click");
            b.objects.close.unbind("click")
        },
        _cleanupDimensions: function() {
            var c = b.objects.contentInner.css("opacity");
            b.objects["case"].css({
                width: "",
                height: "",
                top: "",
                left: "",
                "margin-top": "",
                "margin-left": ""
            });
            b.objects.contentInner.removeAttr("style").css("opacity", c);
            b.objects.contentInner.children().removeAttr("style")
        },
        cleanup: function() {
            b._cleanupDimensions();
            b.objects.loading.hide();
            b.objects.overlay.hide();
            b.objects["case"].hide();
            b.objects.prev.hide();
            b.objects.next.hide();
            b.objects.play.hide();
            b.objects.pause.hide();
            b.objects["case"].removeAttr(b._prefixAttributeName("type"));
            b.objects.nav.removeAttr(b._prefixAttributeName("ispartofsequence"));
            b.objects.contentInner.empty().hide();
            b.objects.info.children().empty();
            b.cache.originalObject && b._restoreObject();
            b._callHooks(b.settings.onCleanup);
            b.cache = {}
        },
        _matchMedia: function() {
            return window.matchMedia || window.msMatchMedia
        },
        _devicePixelRatio: function() {
            return window.devicePixelRatio || 1
        },
        _isPublicMethod: function(c) {
            return "function" === typeof b[c] && "_" !== c.charAt(0)
        },
        _export: function() {
            window.lightcase = {};
            c.each(b, function(c) {
                b._isPublicMethod(c) && (lightcase[c] = b[c])
            })
        }
    };
    b._export();
    c.fn.lightcase = function(k) {
        if (b._isPublicMethod(k))
            return b[k].apply(this, Array.prototype.slice.call(arguments, 1));
        if ("object" !== typeof k && k)
            c.error("Method " + k + " does not exist on jQuery.lightcase");
        else
            return b.init.apply(this, arguments)
    }
})(jQuery);
!function(c, b) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(k) {
        b(c, k)
    }) : "object" == typeof module && module.exports ? module.exports = b(c, require("jquery")) : c.jQueryBridget = b(c, c.jQuery)
}(window, function(c, b) {
    function k(k, g, n) {
        function f(b, d, c) {
            var f, e = "$()." + k + '("' + d + '")';
            return b.each(function(b, h) {
                var g = n.data(h, k);
                if (!g)
                    return void l(k + " not initialized. Cannot call methods, i.e. " + e);
                var q = g[d];
                if (!q || "_" == d.charAt(0))
                    return void l(e + " is not a valid method");
                g = q.apply(g, c);
                f = void 0 === f ? g : f
            }),
            void 0 !== f ? f : b
        }
        function d(b, d) {
            b.each(function(b, c) {
                var f = n.data(c, k);
                f ? (f.option(d),
                f._init()) : (f = new g(c,d),
                n.data(c, k, f))
            })
        }
        (n = n || b || c.jQuery) && (g.prototype.option || (g.prototype.option = function(b) {
            n.isPlainObject(b) && (this.options = n.extend(!0, this.options, b))
        }
        ),
        n.fn[k] = function(b) {
            if ("string" == typeof b) {
                var c = e.call(arguments, 1);
                return f(this, b, c)
            }
            return d(this, b),
            this
        }
        ,
        h(n))
    }
    function h(b) {
        !b || b && b.bridget || (b.bridget = k)
    }
    var e = Array.prototype.slice
      , n = c.console
      , l = "undefined" == typeof n ? function() {}
    : function(b) {
        n.error(b)
    }
    ;
    return h(b || c.jQuery),
    k
});
(function(c, b) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", b) : "object" == typeof module && module.exports ? module.exports = b() : c.EvEmitter = b()
})(this, function() {
    function c() {}
    var b = c.prototype;
    return b.on = function(b, c) {
        if (b && c) {
            var e = this._events = this._events || {}
              , e = e[b] = e[b] || [];
            return -1 == e.indexOf(c) && e.push(c),
            this
        }
    }
    ,
    b.once = function(b, c) {
        if (b && c) {
            this.on(b, c);
            var e = this._onceEvents = this._onceEvents || {};
            return (e[b] = e[b] || [])[c] = !0,
            this
        }
    }
    ,
    b.off = function(b, c) {
        var e = this._events && this._events[b];
        if (e && e.length) {
            var n = e.indexOf(c);
            return -1 != n && e.splice(n, 1),
            this
        }
    }
    ,
    b.emitEvent = function(b, c) {
        var e = this._events && this._events[b];
        if (e && e.length) {
            var n = 0
              , l = e[n];
            c = c || [];
            for (var m = this._onceEvents && this._onceEvents[b]; l; ) {
                var g = m && m[l];
                g && (this.off(b, l),
                delete m[l]);
                l.apply(this, c);
                n += g ? 0 : 1;
                l = e[n]
            }
            return this
        }
    }
    ,
    c
});
(function(c, b) {
    "function" == typeof define && define.amd ? define("get-size/get-size", [], function() {
        return b()
    }) : "object" == typeof module && module.exports ? module.exports = b() : c.getSize = b()
})(window, function() {
    function c(b) {
        var c = parseFloat(b);
        return -1 == b.indexOf("%") && !isNaN(c) && c
    }
    function b() {}
    function k(b) {
        b = getComputedStyle(b);
        return b || n("Style returned " + b + ". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1"),
        b
    }
    function h(b) {
        if (!g) {
            g = !0;
            var f = document.createElement("div");
            f.style.width = "200px";
            f.style.padding = "1px 2px 3px 4px";
            f.style.borderStyle = "solid";
            f.style.borderWidth = "1px 2px 3px 4px";
            f.style.boxSizing = "border-box";
            var d = document.body || document.documentElement;
            d.appendChild(f);
            var n = k(f);
            h.isBoxSizeOuter = e = 200 == c(n.width);
            d.removeChild(f)
        }
        if ("string" == typeof b && (b = document.querySelector(b)),
        b && "object" == typeof b && b.nodeType) {
            d = k(b);
            if ("none" == d.display) {
                f = {
                    width: 0,
                    height: 0,
                    innerWidth: 0,
                    innerHeight: 0,
                    outerWidth: 0,
                    outerHeight: 0
                };
                for (d = 0; m > d; d++)
                    f[l[d]] = 0;
                return f
            }
            f = {};
            f.width = b.offsetWidth;
            f.height = b.offsetHeight;
            b = f.isBorderBox = "border-box" == d.boxSizing;
            for (n = 0; m > n; n++) {
                var t = l[n]
                  , u = parseFloat(d[t]);
                f[t] = isNaN(u) ? 0 : u
            }
            var n = f.paddingLeft + f.paddingRight
              , t = f.paddingTop + f.paddingBottom
              , u = f.marginLeft + f.marginRight
              , A = f.marginTop + f.marginBottom
              , y = f.borderLeftWidth + f.borderRightWidth
              , N = f.borderTopWidth + f.borderBottomWidth;
            b = b && e;
            var L = c(d.width);
            !1 !== L && (f.width = L + (b ? 0 : n + y));
            d = c(d.height);
            return !1 !== d && (f.height = d + (b ? 0 : t + N)),
            f.innerWidth = f.width - (n + y),
            f.innerHeight = f.height - (t + N),
            f.outerWidth = f.width + u,
            f.outerHeight = f.height + A,
            f
        }
    }
    var e, n = "undefined" == typeof console ? b : function(b) {
        console.error(b)
    }
    , l = "paddingLeft paddingRight paddingTop paddingBottom marginLeft marginRight marginTop marginBottom borderLeftWidth borderRightWidth borderTopWidth borderBottomWidth".split(" "), m = l.length, g = !1;
    return h
});
(function(c, b) {
    "function" == typeof define && define.amd ? define("matches-selector/matches-selector", b) : "object" == typeof module && module.exports ? module.exports = b() : c.matchesSelector = b()
})(window, function() {
    var c = function() {
        var b = Element.prototype;
        if (b.matches)
            return "matches";
        if (b.matchesSelector)
            return "matchesSelector";
        for (var c = ["webkit", "moz", "ms", "o"], h = 0; h < c.length; h++) {
            var e = c[h] + "MatchesSelector";
            if (b[e])
                return e
        }
    }();
    return function(b, k) {
        return b[c](k)
    }
});
(function(c, b) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["matches-selector/matches-selector"], function(k) {
        return b(c, k)
    }) : "object" == typeof module && module.exports ? module.exports = b(c, require("desandro-matches-selector")) : c.fizzyUIUtils = b(c, c.matchesSelector)
})(window, function(c, b) {
    var k = {
        extend: function(b, c) {
            for (var h in c)
                b[h] = c[h];
            return b
        },
        modulo: function(b, c) {
            return (b % c + c) % c
        },
        makeArray: function(b) {
            var c = [];
            if (Array.isArray(b))
                c = b;
            else if (b && "number" == typeof b.length)
                for (var h = 0; h < b.length; h++)
                    c.push(b[h]);
            else
                c.push(b);
            return c
        },
        removeFrom: function(b, c) {
            var h = b.indexOf(c);
            -1 != h && b.splice(h, 1)
        },
        getParent: function(c, h) {
            for (; c != document.body; )
                if (c = c.parentNode,
                b(c, h))
                    return c
        },
        getQueryElement: function(b) {
            return "string" == typeof b ? document.querySelector(b) : b
        },
        handleEvent: function(b) {
            var c = "on" + b.type;
            this[c] && this[c](b)
        },
        filterFindElements: function(c, h) {
            c = k.makeArray(c);
            var l = [];
            return c.forEach(function(c) {
                if (c instanceof HTMLElement) {
                    if (!h)
                        return void l.push(c);
                    b(c, h) && l.push(c);
                    c = c.querySelectorAll(h);
                    for (var e = 0; e < c.length; e++)
                        l.push(c[e])
                }
            }),
            l
        },
        debounceMethod: function(b, c, h) {
            var k = b.prototype[c]
              , g = c + "Timeout";
            b.prototype[c] = function() {
                var b = this[g];
                b && clearTimeout(b);
                var c = arguments
                  , d = this;
                this[g] = setTimeout(function() {
                    k.apply(d, c);
                    delete d[g]
                }, h || 100)
            }
        },
        docReady: function(b) {
            "complete" == document.readyState ? b() : document.addEventListener("DOMContentLoaded", b)
        },
        toDashed: function(b) {
            return b.replace(/(.)([A-Z])/g, function(b, c, e) {
                return c + "-" + e
            }).toLowerCase()
        }
    }
      , h = c.console;
    return k.htmlInit = function(b, n) {
        k.docReady(function() {
            var l = k.toDashed(n)
              , m = "data-" + l
              , g = document.querySelectorAll("[" + m + "]")
              , l = document.querySelectorAll(".js-" + l)
              , g = k.makeArray(g).concat(k.makeArray(l))
              , p = m + "-options"
              , f = c.jQuery;
            g.forEach(function(d) {
                var c, g = d.getAttribute(m) || d.getAttribute(p);
                try {
                    c = g && JSON.parse(g)
                } catch (k) {
                    return void (h && h.error("Error parsing " + m + " on " + d.className + ": " + k))
                }
                c = new b(d,c);
                f && f.data(d, n, c)
            })
        })
    }
    ,
    k
});
(function(c, b) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], function(k, h) {
        return b(c, k, h)
    }) : "object" == typeof module && module.exports ? module.exports = b(c, require("ev-emitter"), require("get-size")) : (c.Outlayer = {},
    c.Outlayer.Item = b(c, c.EvEmitter, c.getSize))
})(window, function(c, b, k) {
    function h(b, d) {
        b && (this.element = b,
        this.layout = d,
        this.position = {
            x: 0,
            y: 0
        },
        this._create())
    }
    c = document.documentElement.style;
    var e = "string" == typeof c.transition ? "transition" : "WebkitTransition"
      , n = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend"
    }[e]
      , l = ["string" == typeof c.transform ? "transform" : "WebkitTransform", e, e + "Duration", e + "Property"];
    b = h.prototype = Object.create(b.prototype);
    b.constructor = h;
    b._create = function() {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        };
        this.css({
            position: "absolute"
        })
    }
    ;
    b.handleEvent = function(b) {
        var d = "on" + b.type;
        this[d] && this[d](b)
    }
    ;
    b.getSize = function() {
        this.size = k(this.element)
    }
    ;
    b.css = function(b) {
        var d = this.element.style, c;
        for (c in b)
            d[l[c] || c] = b[c]
    }
    ;
    b.getPosition = function() {
        var b = getComputedStyle(this.element)
          , d = this.layout._getOption("originLeft")
          , c = this.layout._getOption("originTop")
          , e = b[d ? "left" : "right"]
          , h = b[c ? "top" : "bottom"]
          , b = this.layout.size
          , e = -1 != e.indexOf("%") ? parseFloat(e) / 100 * b.width : parseInt(e, 10)
          , h = -1 != h.indexOf("%") ? parseFloat(h) / 100 * b.height : parseInt(h, 10)
          , e = isNaN(e) ? 0 : e
          , h = isNaN(h) ? 0 : h
          , e = e - (d ? b.paddingLeft : b.paddingRight)
          , h = h - (c ? b.paddingTop : b.paddingBottom);
        this.position.x = e;
        this.position.y = h
    }
    ;
    b.layoutPosition = function() {
        var b = this.layout.size
          , d = {}
          , c = this.layout._getOption("originLeft")
          , e = this.layout._getOption("originTop")
          , h = c ? "right" : "left";
        d[c ? "left" : "right"] = this.getXValue(this.position.x + b[c ? "paddingLeft" : "paddingRight"]);
        d[h] = "";
        c = e ? "bottom" : "top";
        d[e ? "top" : "bottom"] = this.getYValue(this.position.y + b[e ? "paddingTop" : "paddingBottom"]);
        d[c] = "";
        this.css(d);
        this.emitEvent("layout", [this])
    }
    ;
    b.getXValue = function(b) {
        var d = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !d ? b / this.layout.size.width * 100 + "%" : b + "px"
    }
    ;
    b.getYValue = function(b) {
        var d = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && d ? b / this.layout.size.height * 100 + "%" : b + "px"
    }
    ;
    b._transitionTo = function(b, d) {
        this.getPosition();
        var c = this.position.x
          , e = this.position.y
          , h = parseInt(b, 10)
          , g = parseInt(d, 10)
          , h = h === this.position.x && g === this.position.y;
        if (this.setPosition(b, d),
        h && !this.isTransitioning)
            return void this.layoutPosition();
        h = {};
        h.transform = this.getTranslate(b - c, d - e);
        this.transition({
            to: h,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }
    ;
    b.getTranslate = function(b, d) {
        var c = this.layout._getOption("originLeft")
          , e = this.layout._getOption("originTop");
        return b = c ? b : -b,
        d = e ? d : -d,
        "translate3d(" + b + "px, " + d + "px, 0)"
    }
    ;
    b.goTo = function(b, d) {
        this.setPosition(b, d);
        this.layoutPosition()
    }
    ;
    b.moveTo = b._transitionTo;
    b.setPosition = function(b, d) {
        this.position.x = parseInt(b, 10);
        this.position.y = parseInt(d, 10)
    }
    ;
    b._nonTransition = function(b) {
        this.css(b.to);
        b.isCleaning && this._removeStyles(b.to);
        for (var d in b.onTransitionEnd)
            b.onTransitionEnd[d].call(this)
    }
    ;
    b._transition = function(b) {
        if (!parseFloat(this.layout.options.transitionDuration))
            return void this._nonTransition(b);
        var d = this._transn, c;
        for (c in b.onTransitionEnd)
            d.onEnd[c] = b.onTransitionEnd[c];
        for (c in b.to)
            d.ingProperties[c] = !0,
            b.isCleaning && (d.clean[c] = !0);
        b.from && this.css(b.from);
        this.enableTransition(b.to);
        this.css(b.to);
        this.isTransitioning = !0
    }
    ;
    var m = "opacity," + function(b) {
        return b.replace(/([A-Z])/g, function(b) {
            return "-" + b.toLowerCase()
        })
    }(l.transform || "transform");
    b.enableTransition = function() {
        this.isTransitioning || (this.css({
            transitionProperty: m,
            transitionDuration: this.layout.options.transitionDuration
        }),
        this.element.addEventListener(n, this, !1))
    }
    ;
    b.transition = h.prototype[e ? "_transition" : "_nonTransition"];
    b.onwebkitTransitionEnd = function(b) {
        this.ontransitionend(b)
    }
    ;
    b.onotransitionend = function(b) {
        this.ontransitionend(b)
    }
    ;
    var g = {
        "-webkit-transform": "transform"
    };
    b.ontransitionend = function(b) {
        if (b.target === this.element) {
            var c = this._transn
              , e = g[b.propertyName] || b.propertyName;
            delete c.ingProperties[e];
            var h;
            a: {
                h = c.ingProperties;
                for (var k in h) {
                    h = !1;
                    break a
                }
                h = !0
            }
            if (h && this.disableTransition(),
            e in c.clean && (this.element.style[b.propertyName] = "",
            delete c.clean[e]),
            e in c.onEnd)
                c.onEnd[e].call(this),
                delete c.onEnd[e];
            this.emitEvent("transitionEnd", [this])
        }
    }
    ;
    b.disableTransition = function() {
        this.removeTransitionStyles();
        this.element.removeEventListener(n, this, !1);
        this.isTransitioning = !1
    }
    ;
    b._removeStyles = function(b) {
        var c = {}, e;
        for (e in b)
            c[e] = "";
        this.css(c)
    }
    ;
    var p = {
        transitionProperty: "",
        transitionDuration: ""
    };
    return b.removeTransitionStyles = function() {
        this.css(p)
    }
    ,
    b.removeElem = function() {
        this.element.parentNode.removeChild(this.element);
        this.css({
            display: ""
        });
        this.emitEvent("remove", [this])
    }
    ,
    b.remove = function() {
        return e && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
            this.removeElem()
        }),
        void this.hide()) : void this.removeElem()
    }
    ,
    b.reveal = function() {
        delete this.isHidden;
        this.css({
            display: ""
        });
        var b = this.layout.options
          , c = {}
          , e = this.getHideRevealTransitionEndProperty("visibleStyle");
        c[e] = this.onRevealTransitionEnd;
        this.transition({
            from: b.hiddenStyle,
            to: b.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: c
        })
    }
    ,
    b.onRevealTransitionEnd = function() {
        this.isHidden || this.emitEvent("reveal")
    }
    ,
    b.getHideRevealTransitionEndProperty = function(b) {
        b = this.layout.options[b];
        if (b.opacity)
            return "opacity";
        for (var c in b)
            return c
    }
    ,
    b.hide = function() {
        this.isHidden = !0;
        this.css({
            display: ""
        });
        var b = this.layout.options
          , c = {}
          , e = this.getHideRevealTransitionEndProperty("hiddenStyle");
        c[e] = this.onHideTransitionEnd;
        this.transition({
            from: b.visibleStyle,
            to: b.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: c
        })
    }
    ,
    b.onHideTransitionEnd = function() {
        this.isHidden && (this.css({
            display: "none"
        }),
        this.emitEvent("hide"))
    }
    ,
    b.destroy = function() {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }
    ,
    h
});
(function(c, b) {
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(k, h, e, n) {
        return b(c, k, h, e, n)
    }) : "object" == typeof module && module.exports ? module.exports = b(c, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : c.Outlayer = b(c, c.EvEmitter, c.getSize, c.fizzyUIUtils, c.Outlayer.Item)
})(window, function(c, b, k, h, e) {
    function n(b, c) {
        var e = h.getQueryElement(b);
        if (!e)
            return void (m && m.error("Bad element for " + this.constructor.namespace + ": " + (e || b)));
        this.element = e;
        g && (this.$element = g(this.element));
        this.options = h.extend({}, this.constructor.defaults);
        this.option(c);
        e = ++f;
        this.element.outlayerGUID = e;
        d[e] = this;
        this._create();
        this._getOption("initLayout") && this.layout()
    }
    function l(b) {
        function c() {
            b.apply(this, arguments)
        }
        return c.prototype = Object.create(b.prototype),
        c.prototype.constructor = c,
        c
    }
    var m = c.console
      , g = c.jQuery
      , p = function() {}
      , f = 0
      , d = {};
    n.namespace = "outlayer";
    n.Item = e;
    n.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var q = n.prototype;
    return h.extend(q, b.prototype),
    q.option = function(b) {
        h.extend(this.options, b)
    }
    ,
    q._getOption = function(b) {
        var c = this.constructor.compatOptions[b];
        return c && void 0 !== this.options[c] ? this.options[c] : this.options[b]
    }
    ,
    n.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    },
    q._create = function() {
        this.reloadItems();
        this.stamps = [];
        this.stamp(this.options.stamp);
        h.extend(this.element.style, this.options.containerStyle);
        this._getOption("resize") && this.bindResize()
    }
    ,
    q.reloadItems = function() {
        this.items = this._itemize(this.element.children)
    }
    ,
    q._itemize = function(b) {
        b = this._filterFindItemElements(b);
        for (var c = this.constructor.Item, d = [], f = 0; f < b.length; f++) {
            var e = new c(b[f],this);
            d.push(e)
        }
        return d
    }
    ,
    q._filterFindItemElements = function(b) {
        return h.filterFindElements(b, this.options.itemSelector)
    }
    ,
    q.getItemElements = function() {
        return this.items.map(function(b) {
            return b.element
        })
    }
    ,
    q.layout = function() {
        this._resetLayout();
        this._manageStamps();
        var b = this._getOption("layoutInstant");
        this.layoutItems(this.items, void 0 !== b ? b : !this._isLayoutInited);
        this._isLayoutInited = !0
    }
    ,
    q._init = q.layout,
    q._resetLayout = function() {
        this.getSize()
    }
    ,
    q.getSize = function() {
        this.size = k(this.element)
    }
    ,
    q._getMeasurement = function(b, c) {
        var d, f = this.options[b];
        f ? ("string" == typeof f ? d = this.element.querySelector(f) : f instanceof HTMLElement && (d = f),
        this[b] = d ? k(d)[c] : f) : this[b] = 0
    }
    ,
    q.layoutItems = function(b, c) {
        b = this._getItemsForLayout(b);
        this._layoutItems(b, c);
        this._postLayout()
    }
    ,
    q._getItemsForLayout = function(b) {
        return b.filter(function(b) {
            return !b.isIgnored
        })
    }
    ,
    q._layoutItems = function(b, c) {
        if (this._emitCompleteOnItems("layout", b),
        b && b.length) {
            var d = [];
            b.forEach(function(b) {
                var f = this._getItemLayoutPosition(b);
                f.item = b;
                f.isInstant = c || b.isLayoutInstant;
                d.push(f)
            }, this);
            this._processLayoutQueue(d)
        }
    }
    ,
    q._getItemLayoutPosition = function() {
        return {
            x: 0,
            y: 0
        }
    }
    ,
    q._processLayoutQueue = function(b) {
        b.forEach(function(b) {
            this._positionItem(b.item, b.x, b.y, b.isInstant)
        }, this)
    }
    ,
    q._positionItem = function(b, c, d, f) {
        f ? b.goTo(c, d) : b.moveTo(c, d)
    }
    ,
    q._postLayout = function() {
        this.resizeContainer()
    }
    ,
    q.resizeContainer = function() {
        if (this._getOption("resizeContainer")) {
            var b = this._getContainerSize();
            b && (this._setContainerMeasure(b.width, !0),
            this._setContainerMeasure(b.height, !1))
        }
    }
    ,
    q._getContainerSize = p,
    q._setContainerMeasure = function(b, c) {
        if (void 0 !== b) {
            var d = this.size;
            d.isBorderBox && (b += c ? d.paddingLeft + d.paddingRight + d.borderLeftWidth + d.borderRightWidth : d.paddingBottom + d.paddingTop + d.borderTopWidth + d.borderBottomWidth);
            b = Math.max(b, 0);
            this.element.style[c ? "width" : "height"] = b + "px"
        }
    }
    ,
    q._emitCompleteOnItems = function(b, c) {
        function d() {
            e.dispatchEvent(b + "Complete", null , [c])
        }
        function f() {
            g++;
            g == h && d()
        }
        var e = this
          , h = c.length;
        if (!c || !h)
            return void d();
        var g = 0;
        c.forEach(function(c) {
            c.once(b, f)
        })
    }
    ,
    q.dispatchEvent = function(b, c, d) {
        var f = c ? [c].concat(d) : d;
        if (this.emitEvent(b, f),
        g)
            (this.$element = this.$element || g(this.element),
            c) ? (c = g.Event(c),
            c.type = b,
            this.$element.trigger(c, d)) : this.$element.trigger(b, d)
    }
    ,
    q.ignore = function(b) {
        (b = this.getItem(b)) && (b.isIgnored = !0)
    }
    ,
    q.unignore = function(b) {
        (b = this.getItem(b)) && delete b.isIgnored
    }
    ,
    q.stamp = function(b) {
        (b = this._find(b)) && (this.stamps = this.stamps.concat(b),
        b.forEach(this.ignore, this))
    }
    ,
    q.unstamp = function(b) {
        (b = this._find(b)) && b.forEach(function(b) {
            h.removeFrom(this.stamps, b);
            this.unignore(b)
        }, this)
    }
    ,
    q._find = function(b) {
        return b ? ("string" == typeof b && (b = this.element.querySelectorAll(b)),
        h.makeArray(b)) : void 0
    }
    ,
    q._manageStamps = function() {
        this.stamps && this.stamps.length && (this._getBoundingRect(),
        this.stamps.forEach(this._manageStamp, this))
    }
    ,
    q._getBoundingRect = function() {
        var b = this.element.getBoundingClientRect()
          , c = this.size;
        this._boundingRect = {
            left: b.left + c.paddingLeft + c.borderLeftWidth,
            top: b.top + c.paddingTop + c.borderTopWidth,
            right: b.right - (c.paddingRight + c.borderRightWidth),
            bottom: b.bottom - (c.paddingBottom + c.borderBottomWidth)
        }
    }
    ,
    q._manageStamp = p,
    q._getElementOffset = function(b) {
        var c = b.getBoundingClientRect()
          , d = this._boundingRect;
        b = k(b);
        return {
            left: c.left - d.left - b.marginLeft,
            top: c.top - d.top - b.marginTop,
            right: d.right - c.right - b.marginRight,
            bottom: d.bottom - c.bottom - b.marginBottom
        }
    }
    ,
    q.handleEvent = h.handleEvent,
    q.bindResize = function() {
        c.addEventListener("resize", this);
        this.isResizeBound = !0
    }
    ,
    q.unbindResize = function() {
        c.removeEventListener("resize", this);
        this.isResizeBound = !1
    }
    ,
    q.onresize = function() {
        this.resize()
    }
    ,
    h.debounceMethod(n, "onresize", 100),
    q.resize = function() {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }
    ,
    q.needsResizeLayout = function() {
        var b = k(this.element);
        return this.size && b && b.innerWidth !== this.size.innerWidth
    }
    ,
    q.addItems = function(b) {
        b = this._itemize(b);
        return b.length && (this.items = this.items.concat(b)),
        b
    }
    ,
    q.appended = function(b) {
        b = this.addItems(b);
        b.length && (this.layoutItems(b, !0),
        this.reveal(b))
    }
    ,
    q.prepended = function(b) {
        b = this._itemize(b);
        if (b.length) {
            var c = this.items.slice(0);
            this.items = b.concat(c);
            this._resetLayout();
            this._manageStamps();
            this.layoutItems(b, !0);
            this.reveal(b);
            this.layoutItems(c)
        }
    }
    ,
    q.reveal = function(b) {
        this._emitCompleteOnItems("reveal", b);
        b && b.length && b.forEach(function(b) {
            b.reveal()
        })
    }
    ,
    q.hide = function(b) {
        this._emitCompleteOnItems("hide", b);
        b && b.length && b.forEach(function(b) {
            b.hide()
        })
    }
    ,
    q.revealItemElements = function(b) {
        b = this.getItems(b);
        this.reveal(b)
    }
    ,
    q.hideItemElements = function(b) {
        b = this.getItems(b);
        this.hide(b)
    }
    ,
    q.getItem = function(b) {
        for (var c = 0; c < this.items.length; c++) {
            var d = this.items[c];
            if (d.element == b)
                return d
        }
    }
    ,
    q.getItems = function(b) {
        b = h.makeArray(b);
        var c = [];
        return b.forEach(function(b) {
            (b = this.getItem(b)) && c.push(b)
        }, this),
        c
    }
    ,
    q.remove = function(b) {
        b = this.getItems(b);
        this._emitCompleteOnItems("remove", b);
        b && b.length && b.forEach(function(b) {
            b.remove();
            h.removeFrom(this.items, b)
        }, this)
    }
    ,
    q.destroy = function() {
        var b = this.element.style;
        b.height = "";
        b.position = "";
        b.width = "";
        this.items.forEach(function(b) {
            b.destroy()
        });
        this.unbindResize();
        delete d[this.element.outlayerGUID];
        delete this.element.outlayerGUID;
        g && g.removeData(this.element, this.constructor.namespace)
    }
    ,
    n.data = function(b) {
        return (b = (b = h.getQueryElement(b)) && b.outlayerGUID) && d[b]
    }
    ,
    n.create = function(b, c) {
        var d = l(n);
        return d.defaults = h.extend({}, n.defaults),
        h.extend(d.defaults, c),
        d.compatOptions = h.extend({}, n.compatOptions),
        d.namespace = b,
        d.data = n.data,
        d.Item = l(e),
        h.htmlInit(d, b),
        g && g.bridget && g.bridget(b, d),
        d
    }
    ,
    n.Item = e,
    n
});
(function(c, b) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], b) : "object" == typeof module && module.exports ? module.exports = b(require("outlayer"), require("get-size")) : c.Masonry = b(c.Outlayer, c.getSize)
})(window, function(c, b) {
    var k = c.create("masonry");
    return k.compatOptions.fitWidth = "isFitWidth",
    k.prototype._resetLayout = function() {
        this.getSize();
        this._getMeasurement("columnWidth", "outerWidth");
        this._getMeasurement("gutter", "outerWidth");
        this.measureColumns();
        this.colYs = [];
        for (var b = 0; b < this.cols; b++)
            this.colYs.push(0);
        this.maxY = 0
    }
    ,
    k.prototype.measureColumns = function() {
        if (this.getContainerWidth(),
        !this.columnWidth) {
            var c = this.items[0];
            this.columnWidth = (c = c && c.element) && b(c).outerWidth || this.containerWidth
        }
        var c = this.columnWidth += this.gutter
          , e = this.containerWidth + this.gutter
          , k = c - e % c
          , c = Math[k && 1 > k ? "round" : "floor"](e / c);
        this.cols = Math.max(c, 1)
    }
    ,
    k.prototype.getContainerWidth = function() {
        var c = this._getOption("fitWidth") ? this.element.parentNode : this.element;
        this.containerWidth = (c = b(c)) && c.innerWidth
    }
    ,
    k.prototype._getItemLayoutPosition = function(b) {
        b.getSize();
        var c = b.size.outerWidth % this.columnWidth
          , c = Math[c && 1 > c ? "round" : "ceil"](b.size.outerWidth / this.columnWidth)
          , c = Math.min(c, this.cols)
          , k = this._getColGroup(c)
          , l = Math.min.apply(Math, k)
          , c = k.indexOf(l)
          , m = {
            x: this.columnWidth * c,
            y: l
        };
        b = l + b.size.outerHeight;
        k = this.cols + 1 - k.length;
        for (l = 0; k > l; l++)
            this.colYs[c + l] = b;
        return m
    }
    ,
    k.prototype._getColGroup = function(b) {
        if (2 > b)
            return this.colYs;
        for (var c = [], k = this.cols + 1 - b, l = 0; k > l; l++) {
            var m = this.colYs.slice(l, l + b);
            c[l] = Math.max.apply(Math, m)
        }
        return c
    }
    ,
    k.prototype._manageStamp = function(c) {
        var e = b(c)
          , k = this._getElementOffset(c);
        c = this._getOption("originLeft") ? k.left : k.right;
        var l = c + e.outerWidth
          , m = Math.floor(c / this.columnWidth)
          , m = Math.max(0, m);
        c = Math.floor(l / this.columnWidth);
        c -= l % this.columnWidth ? 0 : 1;
        c = Math.min(this.cols - 1, c);
        e = (this._getOption("originTop") ? k.top : k.bottom) + e.outerHeight;
        for (k = m; c >= k; k++)
            this.colYs[k] = Math.max(e, this.colYs[k])
    }
    ,
    k.prototype._getContainerSize = function() {
        this.maxY = Math.max.apply(Math, this.colYs);
        var b = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (b.width = this._getContainerFitWidth()),
        b
    }
    ,
    k.prototype._getContainerFitWidth = function() {
        for (var b = 0, c = this.cols; --c && 0 === this.colYs[c]; )
            b++;
        return (this.cols - b) * this.columnWidth - this.gutter
    }
    ,
    k.prototype.needsResizeLayout = function() {
        var b = this.containerWidth;
        return this.getContainerWidth(),
        b != this.containerWidth
    }
    ,
    k
});
/*
 The MIT License (MIT)
 @todo Lazy Load Icon
 @todo prevent animationend bubling
 @todo itemsScaleUp
 @todo Test Zepto
 @todo stagePadding calculate wrong active classes
 The MIT License (MIT)
 The MIT License (MIT)
 The MIT License (MIT)
 The MIT License (MIT)
 The MIT License (MIT)
 The MIT License (MIT)
 The MIT License (MIT)
*/
(function(c, b, k, h) {
    function e(b, d) {
        this.settings = null ;
        this.options = c.extend({}, e.Defaults, d);
        this.$element = c(b);
        this.drag = c.extend({}, m);
        this.state = c.extend({}, g);
        this.e = c.extend({}, p);
        this._plugins = {};
        this._supress = {};
        this._speed = this._current = null ;
        this._coordinates = [];
        this._width = this._breakpoint = null ;
        this._items = [];
        this._clones = [];
        this._mergers = [];
        this._invalidated = {};
        this._pipe = [];
        c.each(e.Plugins, c.proxy(function(b, c) {
            this._plugins[b[0].toLowerCase() + b.slice(1)] = new c(this)
        }, this));
        c.each(e.Pipe, c.proxy(function(b, d) {
            this._pipe.push({
                filter: d.filter,
                run: c.proxy(d.run, this)
            })
        }, this));
        this.setup();
        this.initialize()
    }
    function n(b) {
        if (b.touches !== h)
            return {
                x: b.touches[0].pageX,
                y: b.touches[0].pageY
            };
        if (b.touches === h) {
            if (b.pageX !== h)
                return {
                    x: b.pageX,
                    y: b.pageY
                };
            if (b.pageX === h)
                return {
                    x: b.clientX,
                    y: b.clientY
                }
        }
    }
    function l(b) {
        var c, e, g = k.createElement("div");
        for (c in b)
            if (e = b[c],
            "undefined" !== typeof g.style[e])
                return [e, c];
        return [!1]
    }
    var m, g, p;
    m = {
        start: 0,
        startX: 0,
        startY: 0,
        current: 0,
        currentX: 0,
        currentY: 0,
        offsetX: 0,
        offsetY: 0,
        distance: null ,
        startTime: 0,
        endTime: 0,
        updatedX: 0,
        targetEl: null
    };
    g = {
        isTouch: !1,
        isScrolling: !1,
        isSwiping: !1,
        direction: !1,
        inMotion: !1
    };
    p = {
        _onDragStart: null ,
        _onDragMove: null ,
        _onDragEnd: null ,
        _transitionEnd: null ,
        _resizer: null ,
        _responsiveCall: null ,
        _goToLoop: null ,
        _checkVisibile: null
    };
    e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        responsiveClass: !1,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        themeClass: "owl-theme",
        baseClass: "owl-carousel",
        itemClass: "owl-item",
        centerClass: "center",
        activeClass: "active"
    };
    e.Width = {
        Default: "default",
        Inner: "inner",
        Outer: "outer"
    };
    e.Plugins = {};
    e.Pipe = [{
        filter: ["width", "items", "settings"],
        run: function(b) {
            b.current = this._items && this._items[this.relative(this._current)]
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b = this._clones;
            if (this.$stage.children(".cloned").length !== b.length || !this.settings.loop && 0 < b.length)
                this.$stage.children(".cloned").remove(),
                this._clones = []
        }
    }, {
        filter: ["items", "settings"],
        run: function() {
            var b, c, e = this._clones, g = this._items, h = this.settings.loop ? e.length - Math.max(2 * this.settings.items, 4) : 0;
            b = 0;
            for (c = Math.abs(h / 2); b < c; b++)
                0 < h ? (this.$stage.children().eq(g.length + e.length - 1).remove(),
                e.pop(),
                this.$stage.children().eq(0).remove(),
                e.pop()) : (e.push(e.length / 2),
                this.$stage.append(g[e[e.length - 1]].clone().addClass("cloned")),
                e.push(g.length - 1 - (e.length - 1) / 2),
                this.$stage.prepend(g[e[e.length - 1]].clone().addClass("cloned")))
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var b = this.settings.rtl ? 1 : -1, c = (this.width() / this.settings.items).toFixed(3), e = 0, g, h, k;
            this._coordinates = [];
            h = 0;
            for (k = this._clones.length + this._items.length; h < k; h++)
                g = this._mergers[this.relative(h)],
                g = this.settings.mergeFit && Math.min(g, this.settings.items) || g,
                e += (this.settings.autoWidth ? this._items[this.relative(h)].width() + this.settings.margin : c * g) * b,
                this._coordinates.push(e)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function() {
            var b, d;
            b = (this.width() / this.settings.items).toFixed(3);
            var e = {
                width: Math.abs(this._coordinates[this._coordinates.length - 1]) + 2 * this.settings.stagePadding,
                "padding-left": this.settings.stagePadding || "",
                "padding-right": this.settings.stagePadding || ""
            };
            this.$stage.css(e);
            e = {
                width: this.settings.autoWidth ? "auto" : b - this.settings.margin
            };
            e[this.settings.rtl ? "margin-left" : "margin-right"] = this.settings.margin;
            if (!this.settings.autoWidth && 0 < c.grep(this._mergers, function(b) {
                return 1 < b
            }).length)
                for (b = 0,
                d = this._coordinates.length; b < d; b++)
                    e.width = Math.abs(this._coordinates[b]) - Math.abs(this._coordinates[b - 1] || 0) - this.settings.margin,
                    this.$stage.children().eq(b).css(e);
            else
                this.$stage.children().css(e)
        }
    }, {
        filter: ["width", "items", "settings"],
        run: function(b) {
            b.current && this.reset(this.$stage.children().index(b.current))
        }
    }, {
        filter: ["position"],
        run: function() {
            this.animate(this.coordinates(this._current))
        }
    }, {
        filter: ["width", "position", "items", "settings"],
        run: function() {
            var b = this.settings.rtl ? 1 : -1, c = 2 * this.settings.stagePadding, e = this.coordinates(this.current()) + c, g = e + this.width() * b, h, k, l = [], n, m;
            n = 0;
            for (m = this._coordinates.length; n < m; n++)
                h = this._coordinates[n - 1] || 0,
                k = Math.abs(this._coordinates[n]) + c * b,
                (this.op(h, "<=", e) && this.op(h, ">", g) || this.op(k, "<", e) && this.op(k, ">", g)) && l.push(n);
            this.$stage.children("." + this.settings.activeClass).removeClass(this.settings.activeClass);
            this.$stage.children(":eq(" + l.join("), :eq(") + ")").addClass(this.settings.activeClass);
            this.settings.center && (this.$stage.children("." + this.settings.centerClass).removeClass(this.settings.centerClass),
            this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))
        }
    }];
    e.prototype.initialize = function() {
        this.trigger("initialize");
        this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl", this.settings.rtl);
        this.browserSupport();
        if (this.settings.autoWidth && !0 !== this.state.imagesLoaded) {
            var b, d;
            b = this.$element.find("img");
            d = this.$element.children(this.settings.nestedItemSelector ? "." + this.settings.nestedItemSelector : h).width();
            if (b.length && 0 >= d)
                return this.preloadAutoWidthImages(b),
                !1
        }
        this.$element.addClass("owl-loading");
        this.$stage = c("<" + this.settings.stageElement + ' class="owl-stage"/>').wrap('<div class="owl-stage-outer">');
        this.$element.append(this.$stage.parent());
        this.replace(this.$element.children().not(this.$stage.parent()));
        this._width = this.$element.width();
        this.refresh();
        this.$element.removeClass("owl-loading").addClass("owl-loaded");
        this.eventsCall();
        this.internalEvents();
        this.addTriggerableEvents();
        this.trigger("initialized")
    }
    ;
    e.prototype.setup = function() {
        var b = this.viewport()
          , d = this.options.responsive
          , e = -1
          , g = null ;
        d ? (c.each(d, function(c) {
            c <= b && c > e && (e = Number(c))
        }),
        g = c.extend({}, this.options, d[e]),
        delete g.responsive,
        g.responsiveClass && this.$element.attr("class", function(b, c) {
            return c.replace(/\b owl-responsive-\S+/g, "")
        }).addClass("owl-responsive-" + e)) : g = c.extend({}, this.options);
        if (null === this.settings || this._breakpoint !== e)
            this.trigger("change", {
                property: {
                    name: "settings",
                    value: g
                }
            }),
            this._breakpoint = e,
            this.settings = g,
            this.invalidate("settings"),
            this.trigger("changed", {
                property: {
                    name: "settings",
                    value: this.settings
                }
            })
    }
    ;
    e.prototype.optionsLogic = function() {
        this.$element.toggleClass("owl-center", this.settings.center);
        this.settings.loop && this._items.length < this.settings.items && (this.settings.loop = !1);
        this.settings.autoWidth && (this.settings.stagePadding = !1,
        this.settings.merge = !1)
    }
    ;
    e.prototype.prepare = function(b) {
        var d = this.trigger("prepare", {
            content: b
        });
        d.data || (d.data = c("<" + this.settings.itemElement + "/>").addClass(this.settings.itemClass).append(b));
        this.trigger("prepared", {
            content: d.data
        });
        return d.data
    }
    ;
    e.prototype.update = function() {
        for (var b = 0, d = this._pipe.length, e = c.proxy(function(b) {
            return this[b]
        }, this._invalidated), g = {}; b < d; )
            (this._invalidated.all || 0 < c.grep(this._pipe[b].filter, e).length) && this._pipe[b].run(g),
            b++;
        this._invalidated = {}
    }
    ;
    e.prototype.width = function(b) {
        b = b || e.Width.Default;
        switch (b) {
        case e.Width.Inner:
        case e.Width.Outer:
            return this._width;
        default:
            return this._width - 2 * this.settings.stagePadding + this.settings.margin
        }
    }
    ;
    e.prototype.refresh = function() {
        if (0 === this._items.length)
            return !1;
        (new Date).getTime();
        this.trigger("refresh");
        this.setup();
        this.optionsLogic();
        this.$stage.addClass("owl-refresh");
        this.update();
        this.$stage.removeClass("owl-refresh");
        this.state.orientation = b.orientation;
        this.watchVisibility();
        this.trigger("refreshed")
    }
    ;
    e.prototype.eventsCall = function() {
        this.e._onDragStart = c.proxy(function(b) {
            this.onDragStart(b)
        }, this);
        this.e._onDragMove = c.proxy(function(b) {
            this.onDragMove(b)
        }, this);
        this.e._onDragEnd = c.proxy(function(b) {
            this.onDragEnd(b)
        }, this);
        this.e._onResize = c.proxy(function(b) {
            this.onResize(b)
        }, this);
        this.e._transitionEnd = c.proxy(function(b) {
            this.transitionEnd(b)
        }, this);
        this.e._preventClick = c.proxy(function(b) {
            this.preventClick(b)
        }, this)
    }
    ;
    e.prototype.onThrottledResize = function() {
        b.clearTimeout(this.resizeTimer);
        this.resizeTimer = b.setTimeout(this.e._onResize, this.settings.responsiveRefreshRate)
    }
    ;
    e.prototype.onResize = function() {
        if (!this._items.length || this._width === this.$element.width() || this.trigger("resize").isDefaultPrevented())
            return !1;
        this._width = this.$element.width();
        this.invalidate("width");
        this.refresh();
        this.trigger("resized")
    }
    ;
    e.prototype.eventsRouter = function(b) {
        var c = b.type;
        if ("mousedown" === c || "touchstart" === c)
            this.onDragStart(b);
        else if ("mousemove" === c || "touchmove" === c)
            this.onDragMove(b);
        else if ("mouseup" === c || "touchend" === c)
            this.onDragEnd(b);
        else if ("touchcancel" === c)
            this.onDragEnd(b)
    }
    ;
    e.prototype.internalEvents = function() {
        var f = b.navigator.msPointerEnabled;
        this.settings.mouseDrag ? (this.$stage.on("mousedown", c.proxy(function(b) {
            this.eventsRouter(b)
        }, this)),
        this.$stage.on("dragstart", function() {
            return !1
        }),
        this.$stage.get(0).onselectstart = function() {
            return !1
        }
        ) : this.$element.addClass("owl-text-select-on");
        if (this.settings.touchDrag && !f)
            this.$stage.on("touchstart touchcancel", c.proxy(function(b) {
                this.eventsRouter(b)
            }, this));
        if (this.transitionEndVendor)
            this.on(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd, !1);
        if (!1 !== this.settings.responsive)
            this.on(b, "resize", c.proxy(this.onThrottledResize, this))
    }
    ;
    e.prototype.onDragStart = function(f) {
        var d, e, g;
        f = f.originalEvent || f || b.event;
        if (3 === f.which || this.state.isTouch)
            return !1;
        "mousedown" === f.type && this.$stage.addClass("owl-grab");
        this.trigger("drag");
        this.drag.startTime = (new Date).getTime();
        this.speed(0);
        this.state.isTouch = !0;
        this.state.isScrolling = !1;
        this.state.isSwiping = !1;
        this.drag.distance = 0;
        d = n(f).x;
        e = n(f).y;
        this.drag.offsetX = this.$stage.position().left;
        this.drag.offsetY = this.$stage.position().top;
        this.settings.rtl && (this.drag.offsetX = this.$stage.position().left + this.$stage.width() - this.width() + this.settings.margin);
        if (this.state.inMotion && this.support3d)
            g = this.getTransformProperty(),
            this.drag.offsetX = g,
            this.animate(g),
            this.state.inMotion = !0;
        else if (this.state.inMotion && !this.support3d)
            return this.state.inMotion = !1;
        this.drag.startX = d - this.drag.offsetX;
        this.drag.startY = e - this.drag.offsetY;
        this.drag.start = d - this.drag.startX;
        this.drag.targetEl = f.target || f.srcElement;
        this.drag.updatedX = this.drag.start;
        if ("IMG" === this.drag.targetEl.tagName || "A" === this.drag.targetEl.tagName)
            this.drag.targetEl.draggable = !1;
        c(k).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents", c.proxy(function(b) {
            this.eventsRouter(b)
        }, this))
    }
    ;
    e.prototype.onDragMove = function(c) {
        var d, e, g;
        if (this.state.isTouch && !this.state.isScrolling) {
            c = c.originalEvent || c || b.event;
            d = n(c).x;
            e = n(c).y;
            this.drag.currentX = d - this.drag.startX;
            this.drag.currentY = e - this.drag.startY;
            this.drag.distance = this.drag.currentX - this.drag.offsetX;
            0 > this.drag.distance ? this.state.direction = this.settings.rtl ? "right" : "left" : 0 < this.drag.distance && (this.state.direction = this.settings.rtl ? "left" : "right");
            this.settings.loop ? this.op(this.drag.currentX, ">", this.coordinates(this.minimum())) && "right" === this.state.direction ? this.drag.currentX -= (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length) : this.op(this.drag.currentX, "<", this.coordinates(this.maximum())) && "left" === this.state.direction && (this.drag.currentX += (this.settings.center && this.coordinates(0)) - this.coordinates(this._items.length)) : (d = this.settings.rtl ? this.coordinates(this.maximum()) : this.coordinates(this.minimum()),
            e = this.settings.rtl ? this.coordinates(this.minimum()) : this.coordinates(this.maximum()),
            g = this.settings.pullDrag ? this.drag.distance / 5 : 0,
            this.drag.currentX = Math.max(Math.min(this.drag.currentX, d + g), e + g));
            if (8 < this.drag.distance || -8 > this.drag.distance)
                c.preventDefault !== h ? c.preventDefault() : c.returnValue = !1,
                this.state.isSwiping = !0;
            this.drag.updatedX = this.drag.currentX;
            (16 < this.drag.currentY || -16 > this.drag.currentY) && !1 === this.state.isSwiping && (this.state.isScrolling = !0,
            this.drag.updatedX = this.drag.start);
            this.animate(this.drag.updatedX)
        }
    }
    ;
    e.prototype.onDragEnd = function(b) {
        var d;
        if (this.state.isTouch) {
            "mouseup" === b.type && this.$stage.removeClass("owl-grab");
            this.trigger("dragged");
            this.drag.targetEl.removeAttribute("draggable");
            this.state.isTouch = !1;
            this.state.isScrolling = !1;
            this.state.isSwiping = !1;
            if (0 === this.drag.distance && !0 !== this.state.inMotion)
                return this.state.inMotion = !1;
            this.drag.endTime = (new Date).getTime();
            b = this.drag.endTime - this.drag.startTime;
            d = Math.abs(this.drag.distance);
            (3 < d || 300 < b) && this.removeClick(this.drag.targetEl);
            b = this.closest(this.drag.updatedX);
            this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed);
            this.current(b);
            this.invalidate("position");
            this.update();
            this.settings.pullDrag || this.drag.updatedX !== this.coordinates(b) || this.transitionEnd();
            this.drag.distance = 0;
            c(k).off(".owl.dragEvents")
        }
    }
    ;
    e.prototype.removeClick = function(f) {
        this.drag.targetEl = f;
        c(f).on("click.preventClick", this.e._preventClick);
        b.setTimeout(function() {
            c(f).off("click.preventClick")
        }, 300)
    }
    ;
    e.prototype.preventClick = function(b) {
        b.preventDefault ? b.preventDefault() : b.returnValue = !1;
        b.stopPropagation && b.stopPropagation();
        c(b.target).off("click.preventClick")
    }
    ;
    e.prototype.getTransformProperty = function() {
        var c;
        c = b.getComputedStyle(this.$stage.get(0), null ).getPropertyValue(this.vendorName + "transform");
        c = c.replace(/matrix(3d)?\(|\)/g, "").split(",");
        return 16 === c.length !== !0 ? c[4] : c[12]
    }
    ;
    e.prototype.closest = function(b) {
        var d = -1
          , e = this.width()
          , g = this.coordinates();
        this.settings.freeDrag || c.each(g, c.proxy(function(c, h) {
            b > h - 30 && b < h + 30 ? d = c : this.op(b, "<", h) && this.op(b, ">", g[c + 1] || h - e) && (d = "left" === this.state.direction ? c + 1 : c);
            return -1 === d
        }, this));
        this.settings.loop || (this.op(b, ">", g[this.minimum()]) ? d = b = this.minimum() : this.op(b, "<", g[this.maximum()]) && (d = b = this.maximum()));
        return d
    }
    ;
    e.prototype.animate = function(b) {
        this.trigger("translate");
        this.state.inMotion = 0 < this.speed();
        this.support3d ? this.$stage.css({
            transform: "translate3d(" + b + "px,0px, 0px)",
            transition: this.speed() / 1E3 + "s"
        }) : this.state.isTouch ? this.$stage.css({
            left: b + "px"
        }) : this.$stage.animate({
            left: b
        }, this.speed() / 1E3, this.settings.fallbackEasing, c.proxy(function() {
            this.state.inMotion && this.transitionEnd()
        }, this))
    }
    ;
    e.prototype.current = function(b) {
        if (b === h)
            return this._current;
        if (0 === this._items.length)
            return h;
        b = this.normalize(b);
        if (this._current !== b) {
            var c = this.trigger("change", {
                property: {
                    name: "position",
                    value: b
                }
            });
            c.data !== h && (b = this.normalize(c.data));
            this._current = b;
            this.invalidate("position");
            this.trigger("changed", {
                property: {
                    name: "position",
                    value: this._current
                }
            })
        }
        return this._current
    }
    ;
    e.prototype.invalidate = function(b) {
        this._invalidated[b] = !0
    }
    ;
    e.prototype.reset = function(b) {
        b = this.normalize(b);
        b !== h && (this._speed = 0,
        this._current = b,
        this.suppress(["translate", "translated"]),
        this.animate(this.coordinates(b)),
        this.release(["translate", "translated"]))
    }
    ;
    e.prototype.normalize = function(b, d) {
        var e = d ? this._items.length : this._items.length + this._clones.length;
        return !c.isNumeric(b) || 1 > e ? h : b = this._clones.length ? (b % e + e) % e : Math.max(this.minimum(d), Math.min(this.maximum(d), b))
    }
    ;
    e.prototype.relative = function(b) {
        b = this.normalize(b);
        b -= this._clones.length / 2;
        return this.normalize(b, !0)
    }
    ;
    e.prototype.maximum = function(b) {
        var c, e = 0, g;
        g = this.settings;
        if (b)
            return this._items.length - 1;
        if (!g.loop && g.center)
            c = this._items.length - 1;
        else if (g.loop || g.center)
            if (g.loop || g.center)
                c = this._items.length + g.items;
            else if (g.autoWidth || g.merge)
                for (revert = g.rtl ? 1 : -1,
                b = this.$stage.width() - this.$element.width(); (g = this.coordinates(e)) && !(g * revert >= b); )
                    c = ++e;
            else
                throw "Can not detect maximum absolute position.";
        else
            c = this._items.length - g.items;
        return c
    }
    ;
    e.prototype.minimum = function(b) {
        return b ? 0 : this._clones.length / 2
    }
    ;
    e.prototype.items = function(b) {
        if (b === h)
            return this._items.slice();
        b = this.normalize(b, !0);
        return this._items[b]
    }
    ;
    e.prototype.mergers = function(b) {
        if (b === h)
            return this._mergers.slice();
        b = this.normalize(b, !0);
        return this._mergers[b]
    }
    ;
    e.prototype.clones = function(b) {
        var d = this._clones.length / 2
          , e = d + this._items.length;
        return b === h ? c.map(this._clones, function(b, c) {
            return 0 === c % 2 ? e + c / 2 : d - (c + 1) / 2
        }) : c.map(this._clones, function(c, g) {
            return c === b ? 0 === g % 2 ? e + g / 2 : d - (g + 1) / 2 : null
        })
    }
    ;
    e.prototype.speed = function(b) {
        b !== h && (this._speed = b);
        return this._speed
    }
    ;
    e.prototype.coordinates = function(b) {
        var d = null ;
        if (b === h)
            return c.map(this._coordinates, c.proxy(function(b, c) {
                return this.coordinates(c)
            }, this));
        this.settings.center ? (d = this._coordinates[b],
        d += (this.width() - d + (this._coordinates[b - 1] || 0)) / 2 * (this.settings.rtl ? -1 : 1)) : d = this._coordinates[b - 1] || 0;
        return d
    }
    ;
    e.prototype.duration = function(b, c, e) {
        return Math.min(Math.max(Math.abs(c - b), 1), 6) * Math.abs(e || this.settings.smartSpeed)
    }
    ;
    e.prototype.to = function(f, d) {
        if (this.settings.loop) {
            var e = f - this.relative(this.current())
              , g = this.current()
              , h = this.current()
              , k = this.current() + e
              , l = 0 > h - k ? !0 : !1
              , n = this._clones.length + this._items.length;
            k < this.settings.items && !1 === l ? (g = h + this._items.length,
            this.reset(g)) : k >= n - this.settings.items && !0 === l && (g = h - this._items.length,
            this.reset(g));
            b.clearTimeout(this.e._goToLoop);
            this.e._goToLoop = b.setTimeout(c.proxy(function() {
                this.speed(this.duration(this.current(), g + e, d));
                this.current(g + e);
                this.update()
            }, this), 30)
        } else
            this.speed(this.duration(this.current(), f, d)),
            this.current(f),
            this.update()
    }
    ;
    e.prototype.next = function(b) {
        b = b || !1;
        this.to(this.relative(this.current()) + 1, b)
    }
    ;
    e.prototype.prev = function(b) {
        b = b || !1;
        this.to(this.relative(this.current()) - 1, b)
    }
    ;
    e.prototype.transitionEnd = function(b) {
        if (b !== h && (b.stopPropagation(),
        (b.target || b.srcElement || b.originalTarget) !== this.$stage.get(0)))
            return !1;
        this.state.inMotion = !1;
        this.trigger("translated")
    }
    ;
    e.prototype.viewport = function() {
        var f;
        if (this.options.responsiveBaseElement !== b)
            f = c(this.options.responsiveBaseElement).width();
        else if (b.innerWidth)
            f = b.innerWidth;
        else if (k.documentElement && k.documentElement.clientWidth)
            f = k.documentElement.clientWidth;
        else
            throw "Can not detect viewport width.";
        return f
    }
    ;
    e.prototype.replace = function(b) {
        this.$stage.empty();
        this._items = [];
        b && (b = b instanceof jQuery ? b : c(b));
        this.settings.nestedItemSelector && (b = b.find("." + this.settings.nestedItemSelector));
        b.filter(function() {
            return 1 === this.nodeType
        }).each(c.proxy(function(b, c) {
            c = this.prepare(c);
            this.$stage.append(c);
            this._items.push(c);
            this._mergers.push(1 * c.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)
        }, this));
        this.reset(c.isNumeric(this.settings.startPosition) ? this.settings.startPosition : 0);
        this.invalidate("items")
    }
    ;
    e.prototype.add = function(b, c) {
        c = c === h ? this._items.length : this.normalize(c, !0);
        this.trigger("add", {
            content: b,
            position: c
        });
        0 === this._items.length || c === this._items.length ? (this.$stage.append(b),
        this._items.push(b),
        this._mergers.push(1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1)) : (this._items[c].before(b),
        this._items.splice(c, 0, b),
        this._mergers.splice(c, 0, 1 * b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge") || 1));
        this.invalidate("items");
        this.trigger("added", {
            content: b,
            position: c
        })
    }
    ;
    e.prototype.remove = function(b) {
        b = this.normalize(b, !0);
        b !== h && (this.trigger("remove", {
            content: this._items[b],
            position: b
        }),
        this._items[b].remove(),
        this._items.splice(b, 1),
        this._mergers.splice(b, 1),
        this.invalidate("items"),
        this.trigger("removed", {
            content: null ,
            position: b
        }))
    }
    ;
    e.prototype.addTriggerableEvents = function() {
        var b = c.proxy(function(b, f) {
            return c.proxy(function(c) {
                c.relatedTarget !== this && (this.suppress([f]),
                b.apply(this, [].slice.call(arguments, 1)),
                this.release([f]))
            }, this)
        }, this);
        c.each({
            next: this.next,
            prev: this.prev,
            to: this.to,
            destroy: this.destroy,
            refresh: this.refresh,
            replace: this.replace,
            add: this.add,
            remove: this.remove
        }, c.proxy(function(c, e) {
            this.$element.on(c + ".owl.carousel", b(e, c + ".owl.carousel"))
        }, this))
    }
    ;
    e.prototype.watchVisibility = function() {
        function f(b) {
            return 0 < b.offsetWidth && 0 < b.offsetHeight
        }
        function d() {
            f(this.$element.get(0)) && (this.$element.removeClass("owl-hidden"),
            this.refresh(),
            b.clearInterval(this.e._checkVisibile))
        }
        f(this.$element.get(0)) || (this.$element.addClass("owl-hidden"),
        b.clearInterval(this.e._checkVisibile),
        this.e._checkVisibile = b.setInterval(c.proxy(d, this), 500))
    }
    ;
    e.prototype.preloadAutoWidthImages = function(b) {
        var d, e, g, h;
        d = 0;
        e = this;
        b.each(function(k, l) {
            g = c(l);
            h = new Image;
            h.onload = function() {
                d++;
                g.attr("src", h.src);
                g.css("opacity", 1);
                d >= b.length && (e.state.imagesLoaded = !0,
                e.initialize())
            }
            ;
            h.src = g.attr("src") || g.attr("data-src") || g.attr("data-src-retina")
        })
    }
    ;
    e.prototype.destroy = function() {
        this.$element.hasClass(this.settings.themeClass) && this.$element.removeClass(this.settings.themeClass);
        !1 !== this.settings.responsive && c(b).off("resize.owl.carousel");
        this.transitionEndVendor && this.off(this.$stage.get(0), this.transitionEndVendor, this.e._transitionEnd);
        for (var f in this._plugins)
            this._plugins[f].destroy();
        if (this.settings.mouseDrag || this.settings.touchDrag)
            this.$stage.off("mousedown touchstart touchcancel"),
            c(k).off(".owl.dragEvents"),
            this.$stage.get(0).onselectstart = function() {}
            ,
            this.$stage.off("dragstart", function() {
                return !1
            });
        this.$element.off(".owl");
        this.$stage.children(".cloned").remove();
        this.e = null ;
        this.$element.removeData("owlCarousel");
        this.$stage.children().contents().unwrap();
        this.$stage.children().unwrap();
        this.$stage.unwrap()
    }
    ;
    e.prototype.op = function(b, c, e) {
        var g = this.settings.rtl;
        switch (c) {
        case "<":
            return g ? b > e : b < e;
        case ">":
            return g ? b < e : b > e;
        case ">=":
            return g ? b <= e : b >= e;
        case "<=":
            return g ? b >= e : b <= e
        }
    }
    ;
    e.prototype.on = function(b, c, e, g) {
        b.addEventListener ? b.addEventListener(c, e, g) : b.attachEvent && b.attachEvent("on" + c, e)
    }
    ;
    e.prototype.off = function(b, c, e, g) {
        b.removeEventListener ? b.removeEventListener(c, e, g) : b.detachEvent && b.detachEvent("on" + c, e)
    }
    ;
    e.prototype.trigger = function(b, d, e) {
        var g = {
            item: {
                count: this._items.length,
                index: this.current()
            }
        }
          , h = c.camelCase(c.grep(["on", b, e], function(b) {
            return b
        }).join("-").toLowerCase())
          , k = c.Event([b, "owl", e || "carousel"].join(".").toLowerCase(), c.extend({
            relatedTarget: this
        }, g, d));
        this._supress[b] || (c.each(this._plugins, function(b, c) {
            if (c.onTrigger)
                c.onTrigger(k)
        }),
        this.$element.trigger(k),
        this.settings && "function" === typeof this.settings[h] && this.settings[h].apply(this, k));
        return k
    }
    ;
    e.prototype.suppress = function(b) {
        c.each(b, c.proxy(function(b, c) {
            this._supress[c] = !0
        }, this))
    }
    ;
    e.prototype.release = function(b) {
        c.each(b, c.proxy(function(b, c) {
            delete this._supress[c]
        }, this))
    }
    ;
    e.prototype.browserSupport = function() {
        if (this.support3d = l(["perspective", "webkitPerspective", "MozPerspective", "OPerspective", "MsPerspective"])[0])
            this.transformVendor = l(["transform", "WebkitTransform", "MozTransform", "OTransform", "msTransform"])[0],
            this.transitionEndVendor = ["transitionend", "webkitTransitionEnd", "transitionend", "oTransitionEnd"][l(["transition", "WebkitTransition", "MozTransition", "OTransition"])[1]],
            this.vendorName = this.transformVendor.replace(/Transform/i, ""),
            this.vendorName = "" !== this.vendorName ? "-" + this.vendorName.toLowerCase() + "-" : "";
        this.state.orientation = b.orientation
    }
    ;
    c.fn.owlCarousel = function(b) {
        return this.each(function() {
            c(this).data("owlCarousel") || c(this).data("owlCarousel", new e(this,b))
        })
    }
    ;
    c.fn.owlCarousel.Constructor = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(b) {
        this._core = b;
        this._loaded = [];
        this._handlers = {
            "initialized.owl.carousel change.owl.carousel": c.proxy(function(b) {
                if (b.namespace && this._core.settings && this._core.settings.lazyLoad && (b.property && "position" == b.property.name || "initialized" == b.type)) {
                    var e = this._core.settings
                      , g = e.center && Math.ceil(e.items / 2) || e.items
                      , e = e.center && -1 * g || 0;
                    b = (b.property && b.property.value || this._core.current()) + e;
                    for (var h = this._core.clones().length, f = c.proxy(function(b, c) {
                        this.load(c)
                    }, this); e++ < g; )
                        this.load(h / 2 + this._core.relative(b)),
                        h && c.each(this._core.clones(this._core.relative(b++)), f)
                }
            }, this)
        };
        this._core.options = c.extend({}, e.Defaults, this._core.options);
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        lazyLoad: !1
    };
    e.prototype.load = function(e) {
        var h = (e = this._core.$stage.children().eq(e)) && e.find(".owl-lazy");
        !h || -1 < c.inArray(e.get(0), this._loaded) || (h.each(c.proxy(function(e, g) {
            var h = c(g), f, d = 1 < b.devicePixelRatio && h.attr("data-src-retina") || h.attr("data-src");
            this._core.trigger("load", {
                element: h,
                url: d
            }, "lazy");
            h.is("img") ? h.one("load.owl.lazy", c.proxy(function() {
                h.css("opacity", 1);
                this._core.trigger("loaded", {
                    element: h,
                    url: d
                }, "lazy")
            }, this)).attr("src", d) : (f = new Image,
            f.onload = c.proxy(function() {
                h.css({
                    "background-image": "url(" + d + ")",
                    opacity: "1"
                });
                this._core.trigger("loaded", {
                    element: h,
                    url: d
                }, "lazy")
            }, this),
            f.src = d)
        }, this)),
        this._loaded.push(e.get(0)))
    }
    ;
    e.prototype.destroy = function() {
        var b, c;
        for (b in this.handlers)
            this._core.$element.off(b, this.handlers[b]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null )
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.Lazy = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(b) {
        this._core = b;
        this._handlers = {
            "initialized.owl.carousel": c.proxy(function() {
                this._core.settings.autoHeight && this.update()
            }, this),
            "changed.owl.carousel": c.proxy(function(b) {
                this._core.settings.autoHeight && "position" == b.property.name && this.update()
            }, this),
            "loaded.owl.lazy": c.proxy(function(b) {
                this._core.settings.autoHeight && b.element.closest("." + this._core.settings.itemClass) === this._core.$stage.children().eq(this._core.current()) && this.update()
            }, this)
        };
        this._core.options = c.extend({}, e.Defaults, this._core.options);
        this._core.$element.on(this._handlers)
    };
    e.Defaults = {
        autoHeight: !1,
        autoHeightClass: "owl-height"
    };
    e.prototype.update = function() {
        this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)
    }
    ;
    e.prototype.destroy = function() {
        var b, c;
        for (b in this._handlers)
            this._core.$element.off(b, this._handlers[b]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null )
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.AutoHeight = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(b) {
        this._core = b;
        this._videos = {};
        this._playing = null ;
        this._fullscreen = !1;
        this._handlers = {
            "resize.owl.carousel": c.proxy(function(b) {
                this._core.settings.video && !this.isInFullScreen() && b.preventDefault()
            }, this),
            "refresh.owl.carousel changed.owl.carousel": c.proxy(function(b) {
                this._playing && this.stop()
            }, this),
            "prepared.owl.carousel": c.proxy(function(b) {
                var e = c(b.content).find(".owl-video");
                e.length && (e.css("display", "none"),
                this.fetch(e, c(b.content)))
            }, this)
        };
        this._core.options = c.extend({}, e.Defaults, this._core.options);
        this._core.$element.on(this._handlers);
        this._core.$element.on("click.owl.video", ".owl-video-play-icon", c.proxy(function(b) {
            this.play(b)
        }, this))
    };
    e.Defaults = {
        video: !1,
        videoHeight: !1,
        videoWidth: !1
    };
    e.prototype.fetch = function(b, c) {
        var e;
        b.attr("data-vimeo-id");
        var g;
        b.attr("data-vimeo-id") || b.attr("data-youtube-id");
        var h = b.attr("data-width") || this._core.settings.videoWidth
          , f = b.attr("data-height") || this._core.settings.videoHeight
          , d = b.attr("href");
        if (d) {
            g = d.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
            if (-1 < g[3].indexOf("youtu"))
                e = "youtube";
            else if (-1 < g[3].indexOf("vimeo"))
                e = "vimeo";
            else
                throw Error("Video URL not supported.");
            g = g[6]
        } else
            throw Error("Missing video URL.");
        this._videos[d] = {
            type: e,
            id: g,
            width: h,
            height: f
        };
        c.attr("data-video", d);
        this.thumbnail(b, this._videos[d])
    }
    ;
    e.prototype.thumbnail = function(b, e) {
        var h, g, k = e.width && e.height ? 'style="width:' + e.width + "px;height:" + e.height + 'px;"' : "", f = b.find("img"), d = "src", q = "", t = this._core.settings, u = function(c) {
            h = t.lazyLoad ? '<div class="owl-video-tn ' + q + '" ' + d + '="' + c + '"></div>' : '<div class="owl-video-tn" style="opacity:1;background-image:url(' + c + ')"></div>';
            b.after(h);
            b.after('<div class="owl-video-play-icon"></div>')
        };
        b.wrap('<div class="owl-video-wrapper"' + k + "></div>");
        this._core.settings.lazyLoad && (d = "data-src",
        q = "owl-lazy");
        if (f.length)
            return u(f.attr(d)),
            f.remove(),
            !1;
        "youtube" === e.type ? (g = "http://img.youtube.com/vi/" + e.id + "/hqdefault.jpg",
        u(g)) : "vimeo" === e.type && c.ajax({
            type: "GET",
            url: "http://vimeo.com/api/v2/video/" + e.id + ".json",
            jsonp: "callback",
            dataType: "jsonp",
            success: function(b) {
                g = b[0].thumbnail_large;
                u(g)
            }
        })
    }
    ;
    e.prototype.stop = function() {
        this._core.trigger("stop", null , "video");
        this._playing.find(".owl-video-frame").remove();
        this._playing.removeClass("owl-video-playing");
        this._playing = null
    }
    ;
    e.prototype.play = function(b) {
        this._core.trigger("play", null , "video");
        this._playing && this.stop();
        b = c(b.target || b.srcElement);
        var e = b.closest("." + this._core.settings.itemClass), h = this._videos[e.attr("data-video")], g = h.width || "100%", k = h.height || this._core.$stage.height(), f;
        "youtube" === h.type ? f = '<iframe width="' + g + '" height="' + k + '" src="http://www.youtube.com/embed/' + h.id + "?autoplay=1&v=" + h.id + '" frameborder="0" allowfullscreen></iframe>' : "vimeo" === h.type && (f = '<iframe src="http://player.vimeo.com/video/' + h.id + '?autoplay=1" width="' + g + '" height="' + k + '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>');
        e.addClass("owl-video-playing");
        this._playing = e;
        f = c('<div style="height:' + k + "px; width:" + g + 'px" class="owl-video-frame">' + f + "</div>");
        b.after(f)
    }
    ;
    e.prototype.isInFullScreen = function() {
        var e = k.fullscreenElement || k.mozFullScreenElement || k.webkitFullscreenElement;
        e && c(e).parent().hasClass("owl-video-frame") && (this._core.speed(0),
        this._fullscreen = !0);
        return e && this._fullscreen && this._playing ? !1 : this._fullscreen ? this._fullscreen = !1 : this._playing && this._core.state.orientation !== b.orientation ? (this._core.state.orientation = b.orientation,
        !1) : !0
    }
    ;
    e.prototype.destroy = function() {
        var b, c;
        this._core.$element.off("click.owl.video");
        for (b in this._handlers)
            this._core.$element.off(b, this._handlers[b]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null )
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.Video = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(b) {
        this.core = b;
        this.core.options = c.extend({}, e.Defaults, this.core.options);
        this.swapping = !0;
        this.next = this.previous = h;
        this.handlers = {
            "change.owl.carousel": c.proxy(function(b) {
                "position" == b.property.name && (this.previous = this.core.current(),
                this.next = b.property.value)
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel": c.proxy(function(b) {
                this.swapping = "translated" == b.type
            }, this),
            "translate.owl.carousel": c.proxy(function(b) {
                this.swapping && (this.core.options.animateOut || this.core.options.animateIn) && this.swap()
            }, this)
        };
        this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        animateOut: !1,
        animateIn: !1
    };
    e.prototype.swap = function() {
        if (1 === this.core.settings.items && this.core.support3d) {
            this.core.speed(0);
            var b, e = c.proxy(this.clear, this), h = this.core.$stage.children().eq(this.previous), g = this.core.$stage.children().eq(this.next), k = this.core.settings.animateIn, f = this.core.settings.animateOut;
            if (this.core.current() !== this.previous && (f && (b = this.core.coordinates(this.previous) - this.core.coordinates(this.next),
            h.css({
                left: b + "px"
            }).addClass("animated owl-animated-out").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", e)),
            k))
                g.addClass("animated owl-animated-in").addClass(k).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", e)
        }
    }
    ;
    e.prototype.clear = function(b) {
        c(b.target).css({
            left: ""
        }).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut);
        this.core.transitionEnd()
    }
    ;
    e.prototype.destroy = function() {
        var b, c;
        for (b in this.handlers)
            this.core.$element.off(b, this.handlers[b]);
        for (c in Object.getOwnPropertyNames(this))
            "function" != typeof this[c] && (this[c] = null )
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.Animate = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(b) {
        this.core = b;
        this.core.options = c.extend({}, e.Defaults, this.core.options);
        this.handlers = {
            "translated.owl.carousel refreshed.owl.carousel": c.proxy(function() {
                this.autoplay()
            }, this),
            "play.owl.autoplay": c.proxy(function(b, c, e) {
                this.play(c, e)
            }, this),
            "stop.owl.autoplay": c.proxy(function() {
                this.stop()
            }, this),
            "mouseover.owl.autoplay": c.proxy(function() {
                this.core.settings.autoplayHoverPause && this.pause()
            }, this),
            "mouseleave.owl.autoplay": c.proxy(function() {
                this.core.settings.autoplayHoverPause && this.autoplay()
            }, this)
        };
        this.core.$element.on(this.handlers)
    };
    e.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5E3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1
    };
    e.prototype.autoplay = function() {
        this.core.settings.autoplay && !this.core.state.videoPlay ? (b.clearInterval(this.interval),
        this.interval = b.setInterval(c.proxy(function() {
            this.play()
        }, this), this.core.settings.autoplayTimeout)) : b.clearInterval(this.interval)
    }
    ;
    e.prototype.play = function(c, e) {
        !0 !== k.hidden && (this.core.state.isTouch || this.core.state.isScrolling || this.core.state.isSwiping || this.core.state.inMotion || (!1 === this.core.settings.autoplay ? b.clearInterval(this.interval) : this.core.next(this.core.settings.autoplaySpeed)))
    }
    ;
    e.prototype.stop = function() {
        b.clearInterval(this.interval)
    }
    ;
    e.prototype.pause = function() {
        b.clearInterval(this.interval)
    }
    ;
    e.prototype.destroy = function() {
        var c, e;
        b.clearInterval(this.interval);
        for (c in this.handlers)
            this.core.$element.off(c, this.handlers[c]);
        for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null )
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.autoplay = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(b) {
        this._core = b;
        this._initialized = !1;
        this._pages = [];
        this._controls = {};
        this._templates = [];
        this.$element = this._core.$element;
        this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to
        };
        this._handlers = {
            "prepared.owl.carousel": c.proxy(function(b) {
                this._core.settings.dotsData && this._templates.push(c(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "add.owl.carousel": c.proxy(function(b) {
                this._core.settings.dotsData && this._templates.splice(b.position, 0, c(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))
            }, this),
            "remove.owl.carousel prepared.owl.carousel": c.proxy(function(b) {
                this._core.settings.dotsData && this._templates.splice(b.position, 1)
            }, this),
            "change.owl.carousel": c.proxy(function(b) {
                if ("position" == b.property.name && !this._core.state.revert && !this._core.settings.loop && this._core.settings.navRewind) {
                    var c = this._core.current()
                      , e = this._core.maximum()
                      , h = this._core.minimum();
                    b.data = b.property.value > e ? c >= e ? h : e : b.property.value < h ? e : b.property.value
                }
            }, this),
            "changed.owl.carousel": c.proxy(function(b) {
                "position" == b.property.name && this.draw()
            }, this),
            "refreshed.owl.carousel": c.proxy(function() {
                this._initialized || (this.initialize(),
                this._initialized = !0);
                this._core.trigger("refresh", null , "navigation");
                this.update();
                this.draw();
                this._core.trigger("refreshed", null , "navigation")
            }, this)
        };
        this._core.options = c.extend({}, e.Defaults, this._core.options);
        this.$element.on(this._handlers)
    };
    e.Defaults = {
        nav: !1,
        navRewind: !0,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
        controlsClass: "owl-controls"
    };
    e.prototype.initialize = function() {
        var b, e, h = this._core.settings;
        h.dotsData || (this._templates = [c("<div>").addClass(h.dotClass).append(c("<span>")).prop("outerHTML")]);
        h.navContainer && h.dotsContainer || (this._controls.$container = c("<div>").addClass(h.controlsClass).appendTo(this.$element));
        this._controls.$indicators = h.dotsContainer ? c(h.dotsContainer) : c("<div>").hide().addClass(h.dotsClass).appendTo(this._controls.$container);
        this._controls.$indicators.on("click", "div", c.proxy(function(b) {
            var e = c(b.target).parent().is(this._controls.$indicators) ? c(b.target).index() : c(b.target).parent().index();
            b.preventDefault();
            this.to(e, h.dotsSpeed)
        }, this));
        b = h.navContainer ? c(h.navContainer) : c("<div>").addClass(h.navContainerClass).prependTo(this._controls.$container);
        this._controls.$next = c("<" + h.navElement + ">");
        this._controls.$previous = this._controls.$next.clone();
        this._controls.$previous.addClass(h.navClass[0]).html(h.navText[0]).hide().prependTo(b).on("click", c.proxy(function(b) {
            this.prev(h.navSpeed)
        }, this));
        this._controls.$next.addClass(h.navClass[1]).html(h.navText[1]).hide().appendTo(b).on("click", c.proxy(function(b) {
            this.next(h.navSpeed)
        }, this));
        for (e in this._overrides)
            this._core[e] = c.proxy(this[e], this)
    }
    ;
    e.prototype.destroy = function() {
        var b, c, e, h;
        for (b in this._handlers)
            this.$element.off(b, this._handlers[b]);
        for (c in this._controls)
            this._controls[c].remove();
        for (h in this.overides)
            this._core[h] = this._overrides[h];
        for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null )
    }
    ;
    e.prototype.update = function() {
        var b, c, e;
        b = this._core.settings;
        var h = this._core.clones().length / 2
          , k = h + this._core.items().length
          , f = b.center || b.autoWidth || b.dotData ? 1 : b.dotsEach || b.items;
        "page" !== b.slideBy && (b.slideBy = Math.min(b.slideBy, b.items));
        if (b.dots || "page" == b.slideBy)
            for (this._pages = [],
            b = h,
            e = c = 0; b < k; b++) {
                if (c >= f || 0 === c)
                    this._pages.push({
                        start: b - h,
                        end: b - h + f - 1
                    }),
                    c = 0,
                    ++e;
                c += this._core.mergers(this._core.relative(b))
            }
    }
    ;
    e.prototype.draw = function() {
        var b, e = "", h = this._core.settings;
        this._core.$stage.children();
        b = this._core.relative(this._core.current());
        !h.nav || h.loop || h.navRewind || (this._controls.$previous.toggleClass("disabled", 0 >= b),
        this._controls.$next.toggleClass("disabled", b >= this._core.maximum()));
        this._controls.$previous.toggle(h.nav);
        this._controls.$next.toggle(h.nav);
        if (h.dots) {
            b = this._pages.length - this._controls.$indicators.children().length;
            if (h.dotData && 0 !== b) {
                for (b = 0; b < this._controls.$indicators.children().length; b++)
                    e += this._templates[this._core.relative(b)];
                this._controls.$indicators.html(e)
            } else
                0 < b ? (e = Array(b + 1).join(this._templates[0]),
                this._controls.$indicators.append(e)) : 0 > b && this._controls.$indicators.children().slice(b).remove();
            this._controls.$indicators.find(".active").removeClass("active");
            this._controls.$indicators.children().eq(c.inArray(this.current(), this._pages)).addClass("active")
        }
        this._controls.$indicators.toggle(h.dots)
    }
    ;
    e.prototype.onTrigger = function(b) {
        var e = this._core.settings;
        b.page = {
            index: c.inArray(this.current(), this._pages),
            count: this._pages.length,
            size: e && (e.center || e.autoWidth || e.dotData ? 1 : e.dotsEach || e.items)
        }
    }
    ;
    e.prototype.current = function() {
        var b = this._core.relative(this._core.current());
        return c.grep(this._pages, function(c) {
            return c.start <= b && c.end >= b
        }).pop()
    }
    ;
    e.prototype.getPosition = function(b) {
        var e, h;
        h = this._core.settings;
        "page" == h.slideBy ? (e = c.inArray(this.current(), this._pages),
        h = this._pages.length,
        b ? ++e : --e,
        e = this._pages[(e % h + h) % h].start) : (e = this._core.relative(this._core.current()),
        this._core.items(),
        b ? e += h.slideBy : e -= h.slideBy);
        return e
    }
    ;
    e.prototype.next = function(b) {
        c.proxy(this._overrides.to, this._core)(this.getPosition(!0), b)
    }
    ;
    e.prototype.prev = function(b) {
        c.proxy(this._overrides.to, this._core)(this.getPosition(!1), b)
    }
    ;
    e.prototype.to = function(b, e, h) {
        h ? c.proxy(this._overrides.to, this._core)(b, e) : (h = this._pages.length,
        c.proxy(this._overrides.to, this._core)(this._pages[(b % h + h) % h].start, e))
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.Navigation = e
})(window.Zepto || window.jQuery, window, document);
(function(c, b, k, h) {
    var e = function(h) {
        this._core = h;
        this._hashes = {};
        this.$element = this._core.$element;
        this._handlers = {
            "initialized.owl.carousel": c.proxy(function() {
                "URLHash" == this._core.settings.startPosition && c(b).trigger("hashchange.owl.navigation")
            }, this),
            "prepared.owl.carousel": c.proxy(function(b) {
                var e = c(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");
                this._hashes[e] = b.content
            }, this)
        };
        this._core.options = c.extend({}, e.Defaults, this._core.options);
        this.$element.on(this._handlers);
        c(b).on("hashchange.owl.navigation", c.proxy(function() {
            var c = b.location.hash.substring(1)
              , e = this._core.$stage.children()
              , e = this._hashes[c] && e.index(this._hashes[c]) || 0;
            if (!c)
                return !1;
            this._core.to(e, !1, !0)
        }, this))
    };
    e.Defaults = {
        URLhashListener: !1
    };
    e.prototype.destroy = function() {
        var e, h;
        c(b).off("hashchange.owl.navigation");
        for (e in this._handlers)
            this._core.$element.off(e, this._handlers[e]);
        for (h in Object.getOwnPropertyNames(this))
            "function" != typeof this[h] && (this[h] = null )
    }
    ;
    c.fn.owlCarousel.Constructor.Plugins.Hash = e
})(window.Zepto || window.jQuery, window, document);
(function() {
    window.tabs = function(c) {
        var b = document.querySelector(c.el)
          , k = b.querySelectorAll(c.tabNavigationLinks)
          , h = b.querySelectorAll(c.tabContentContainers)
          , e = 0
          , n = !1
          , l = function(b, c) {
            b.addEventListener("click", function(b) {
                b.preventDefault();
                m(c)
            })
        }
          , m = function(b) {
            b !== e && 0 <= b && b <= k.length && (k[e].classList.remove("is-active"),
            k[b].classList.add("is-active"),
            h[e].classList.remove("is-active"),
            h[b].classList.add("is-active"),
            e = b)
        };
        return {
            init: function() {
                if (!n) {
                    n = !0;
                    b.classList.remove("no-js");
                    for (var c = 0; c < k.length; c++)
                        l(k[c], c)
                }
            },
            goToTab: m
        }
    }
})();
+function(c) {
    var b = function(b, c) {
        this.inState = this.$element = this.hoverState = this.timeout = this.enabled = this.options = this.type = null ;
        this.init("tooltip", b, c)
    };
    b.VERSION = "3.3.6";
    b.TRANSITION_DURATION = 150;
    b.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    };
    b.prototype.init = function(b, e, k) {
        this.enabled = !0;
        this.type = b;
        this.$element = c(e);
        this.options = this.getOptions(k);
        this.$viewport = this.options.viewport && c(c.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport);
        this.inState = {
            click: !1,
            hover: !1,
            focus: !1
        };
        if (this.$element[0]instanceof document.constructor && !this.options.selector)
            throw Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        b = this.options.trigger.split(" ");
        for (e = b.length; e--; )
            if (k = b[e],
            "click" == k)
                this.$element.on("click." + this.type, this.options.selector, c.proxy(this.toggle, this));
            else if ("manual" != k) {
                var l = "hover" == k ? "mouseleave" : "focusout";
                this.$element.on(("hover" == k ? "mouseenter" : "focusin") + "." + this.type, this.options.selector, c.proxy(this.enter, this));
                this.$element.on(l + "." + this.type, this.options.selector, c.proxy(this.leave, this))
            }
        this.options.selector ? this._options = c.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ;
    b.prototype.getDefaults = function() {
        return b.DEFAULTS
    }
    ;
    b.prototype.getOptions = function(b) {
        b = c.extend({}, this.getDefaults(), this.$element.data(), b);
        b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        });
        return b
    }
    ;
    b.prototype.getDelegateOptions = function() {
        var b = {}
          , e = this.getDefaults();
        this._options && c.each(this._options, function(c, k) {
            e[c] != k && (b[c] = k)
        });
        return b
    }
    ;
    b.prototype.enter = function(b) {
        var e = b instanceof this.constructor ? b : c(b.currentTarget).data("bs." + this.type);
        e || (e = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        c(b.currentTarget).data("bs." + this.type, e));
        b instanceof c.Event && (e.inState["focusin" == b.type ? "focus" : "hover"] = !0);
        if (e.tip().hasClass("in") || "in" == e.hoverState)
            e.hoverState = "in";
        else {
            clearTimeout(e.timeout);
            e.hoverState = "in";
            if (!e.options.delay || !e.options.delay.show)
                return e.show();
            e.timeout = setTimeout(function() {
                "in" == e.hoverState && e.show()
            }, e.options.delay.show)
        }
    }
    ;
    b.prototype.isInStateTrue = function() {
        for (var b in this.inState)
            if (this.inState[b])
                return !0;
        return !1
    }
    ;
    b.prototype.leave = function(b) {
        var e = b instanceof this.constructor ? b : c(b.currentTarget).data("bs." + this.type);
        e || (e = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        c(b.currentTarget).data("bs." + this.type, e));
        b instanceof c.Event && (e.inState["focusout" == b.type ? "focus" : "hover"] = !1);
        if (!e.isInStateTrue()) {
            clearTimeout(e.timeout);
            e.hoverState = "out";
            if (!e.options.delay || !e.options.delay.hide)
                return e.hide();
            e.timeout = setTimeout(function() {
                "out" == e.hoverState && e.hide()
            }, e.options.delay.hide)
        }
    }
    ;
    b.prototype.show = function() {
        var h = c.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(h);
            var e = c.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (!h.isDefaultPrevented() && e) {
                var k = this
                  , h = this.tip()
                  , e = this.getUID(this.type);
                this.setContent();
                h.attr("id", e);
                this.$element.attr("aria-describedby", e);
                this.options.animation && h.addClass("fade");
                var e = "function" == typeof this.options.placement ? this.options.placement.call(this, h[0], this.$element[0]) : this.options.placement
                  , l = /\s?auto?\s?/i
                  , m = l.test(e);
                m && (e = e.replace(l, "") || "top");
                h.detach().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).addClass(e).data("bs." + this.type, this);
                this.options.container ? h.appendTo(this.options.container) : h.insertAfter(this.$element);
                this.$element.trigger("inserted.bs." + this.type);
                var l = this.getPosition()
                  , g = h[0].offsetWidth
                  , p = h[0].offsetHeight;
                if (m) {
                    var m = e
                      , f = this.getPosition(this.$viewport)
                      , e = "bottom" == e && l.bottom + p > f.bottom ? "top" : "top" == e && l.top - p < f.top ? "bottom" : "right" == e && l.right + g > f.width ? "left" : "left" == e && l.left - g < f.left ? "right" : e;
                    h.removeClass(m).addClass(e)
                }
                l = this.getCalculatedOffset(e, l, g, p);
                this.applyPlacement(l, e);
                e = function() {
                    var b = k.hoverState;
                    k.$element.trigger("shown.bs." + k.type);
                    k.hoverState = null ;
                    "out" == b && k.leave(k)
                }
                ;
                c.support.transition && this.$tip.hasClass("fade") ? h.one("bsTransitionEnd", e).emulateTransitionEnd(b.TRANSITION_DURATION) : e()
            }
        }
    }
    ;
    b.prototype.applyPlacement = function(b, e) {
        var k = this.tip()
          , l = k[0].offsetWidth
          , m = k[0].offsetHeight
          , g = parseInt(k.css("margin-top"), 10)
          , p = parseInt(k.css("margin-left"), 10);
        isNaN(g) && (g = 0);
        isNaN(p) && (p = 0);
        b.top += g;
        b.left += p;
        c.offset.setOffset(k[0], c.extend({
            using: function(b) {
                k.css({
                    top: Math.round(b.top),
                    left: Math.round(b.left)
                })
            }
        }, b), 0);
        k.addClass("in");
        var p = k[0].offsetWidth
          , f = k[0].offsetHeight;
        "top" == e && f != m && (b.top = b.top + m - f);
        var d = this.getViewportAdjustedDelta(e, b, p, f);
        d.left ? b.left += d.left : b.top += d.top;
        l = (g = /top|bottom/.test(e)) ? 2 * d.left - l + p : 2 * d.top - m + f;
        m = g ? "offsetWidth" : "offsetHeight";
        k.offset(b);
        this.replaceArrow(l, k[0][m], g)
    }
    ;
    b.prototype.replaceArrow = function(b, c, k) {
        this.arrow().css(k ? "left" : "top", 50 * (1 - b / c) + "%").css(k ? "top" : "left", "")
    }
    ;
    b.prototype.setContent = function() {
        var b = this.tip()
          , c = this.getTitle();
        b.find(".tooltip-inner")[this.options.html ? "html" : "text"](c);
        b.removeClass("fade in top bottom left right")
    }
    ;
    b.prototype.hide = function(h) {
        function e() {
            "in" != k.hoverState && l.detach();
            k.$element.removeAttr("aria-describedby").trigger("hidden.bs." + k.type);
            h && h()
        }
        var k = this
          , l = c(this.$tip)
          , m = c.Event("hide.bs." + this.type);
        this.$element.trigger(m);
        if (!m.isDefaultPrevented())
            return l.removeClass("in"),
            c.support.transition && l.hasClass("fade") ? l.one("bsTransitionEnd", e).emulateTransitionEnd(b.TRANSITION_DURATION) : e(),
            this.hoverState = null ,
            this
    }
    ;
    b.prototype.fixTitle = function() {
        var b = this.$element;
        (b.attr("title") || "string" != typeof b.attr("data-original-title")) && b.attr("data-original-title", b.attr("title") || "").attr("title", "")
    }
    ;
    b.prototype.hasContent = function() {
        return this.getTitle()
    }
    ;
    b.prototype.getPosition = function(b) {
        b = b || this.$element;
        var e = b[0]
          , k = "BODY" == e.tagName
          , e = e.getBoundingClientRect();
        null == e.width && (e = c.extend({}, e, {
            width: e.right - e.left,
            height: e.bottom - e.top
        }));
        var l = k ? {
            top: 0,
            left: 0
        } : b.offset();
        b = {
            scroll: k ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop()
        };
        k = k ? {
            width: c(window).width(),
            height: c(window).height()
        } : null ;
        return c.extend({}, e, b, k, l)
    }
    ;
    b.prototype.getCalculatedOffset = function(b, c, k, l) {
        return "bottom" == b ? {
            top: c.top + c.height,
            left: c.left + c.width / 2 - k / 2
        } : "top" == b ? {
            top: c.top - l,
            left: c.left + c.width / 2 - k / 2
        } : "left" == b ? {
            top: c.top + c.height / 2 - l / 2,
            left: c.left - k
        } : {
            top: c.top + c.height / 2 - l / 2,
            left: c.left + c.width
        }
    }
    ;
    b.prototype.getViewportAdjustedDelta = function(b, c, k, l) {
        var m = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return m;
        var g = this.options.viewport && this.options.viewport.padding || 0
          , p = this.getPosition(this.$viewport);
        /right|left/.test(b) ? (k = c.top - g - p.scroll,
        c = c.top + g - p.scroll + l,
        k < p.top ? m.top = p.top - k : c > p.top + p.height && (m.top = p.top + p.height - c)) : (l = c.left - g,
        c = c.left + g + k,
        l < p.left ? m.left = p.left - l : c > p.right && (m.left = p.left + p.width - c));
        return m
    }
    ;
    b.prototype.getTitle = function() {
        var b = this.$element
          , c = this.options;
        return b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }
    ;
    b.prototype.getUID = function(b) {
        do
            b += ~~(1E6 * Math.random());
        while (document.getElementById(b));return b
    }
    ;
    b.prototype.tip = function() {
        if (!this.$tip && (this.$tip = c(this.options.template),
        1 != this.$tip.length))
            throw Error(this.type + " `template` option must consist of exactly 1 top-level element!");
        return this.$tip
    }
    ;
    b.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ;
    b.prototype.enable = function() {
        this.enabled = !0
    }
    ;
    b.prototype.disable = function() {
        this.enabled = !1
    }
    ;
    b.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ;
    b.prototype.toggle = function(b) {
        var e = this;
        b && (e = c(b.currentTarget).data("bs." + this.type),
        e || (e = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        c(b.currentTarget).data("bs." + this.type, e)));
        b ? (e.inState.click = !e.inState.click,
        e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
    }
    ;
    b.prototype.destroy = function() {
        var b = this;
        clearTimeout(this.timeout);
        this.hide(function() {
            b.$element.off("." + b.type).removeData("bs." + b.type);
            b.$tip && b.$tip.detach();
            b.$tip = null ;
            b.$arrow = null ;
            b.$viewport = null
        })
    }
    ;
    var k = c.fn.tooltip;
    c.fn.tooltip = function(h) {
        return this.each(function() {
            var e = c(this)
              , k = e.data("bs.tooltip")
              , l = "object" == typeof h && h;
            if (k || !/destroy|hide/.test(h))
                if (k || e.data("bs.tooltip", k = new b(this,l)),
                "string" == typeof h)
                    k[h]()
        })
    }
    ;
    c.fn.tooltip.Constructor = b;
    c.fn.tooltip.noConflict = function() {
        c.fn.tooltip = k;
        return this
    }
}(jQuery);
