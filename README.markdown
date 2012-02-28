WebDrums
========

A very small naive implementation of an HTML5 drum machine.

A real implementation would use the one of the Web Audio APIs to avoid the hideous timing issues that this version suffers from.

Stores the current state of the machine in the hash part of the URL so if you want to save your pattern, just copy the URL. Paste it back in and force a reload and behold, gabber has never sounded so fresh!

Testing
-------

Verified to work in Firefox 10.0.2. Tried in Chrome 18 but hit a bug where changing HTMLAudioElement.currentTime wouldn't work for WAV files and I haven't got round to re-encoding the samples to get around this.

License
-------

LOL