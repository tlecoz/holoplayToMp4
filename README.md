It's mix of these 2 projects : 

https://github.com/tlecoz/holoplay_typescript 

and

https://github.com/tlecoz/canvasToMp4 


In order to work with the looking glass, the scene must be rendered many times and it may become hard to compute with a good framerate if your graphic card is not good enough. This tool allow you to 

- record frame-by-frame the result of the holographic shader used with the looking glass. 
   
  Because the video is captured frame by frame independently of the rendering framerate, you can generate a smooth video at 60 FPS even with a very complex demo. In the context of the looking glass, it allow you to use a huge quilt (8192x8192 or even 16384x16384) divided in a huge amount of view (64 ,81, 100 , whatever your want...) 

 Be aware that the video file will be huge (it's a 2560x1600 video at 60 fps with a good quality). 
 More than 1 Go by minute.   
  
  IMPORTANT : because each looking glass has its very own calibration values, the pre-processed video will be usable only 
              with your looking glass (if you have two LG , it will work only with the one connected to the computer during
              the capture process) and it only will work in fullscreen. 
 
 
 
 - record frame-by-frame a "quilt-video" containing every views.
    This video should be played with a special video player that use the holographic shader. 
    Because the hologram is not pre-processed, the video will be usable with every looking glass
    
    
The files of your demo must be located in the "src" folder. 
It works like a classic website, the start point is inside src/index.html 

It look like this : 

'''

      var demo;
      var encoder;

      function startApp(){

        var quilt = {
          width:4096,
          height:4096,
          nbX:7,
          nbY:7
        }

        var ffmpegConfig = {
          width:2560,
          height:1600,
          fps:60,
          durationInSeconds:1,
          fileName:"videos/output.mp4",
          encoderType:"h264_nvenc",
          verticalFlip:true
        }


        var createQuiltVideo = false
        var mode = HoloAppType.HOLOGRAM_VIDEO_ENCODER;

        if(createQuiltVideo){
          ffmpegConfig.width = quilt.width;
          ffmpegConfig.height = quilt.height;
          mode = HoloAppType.QUILT_VIDEO_ENCODER;
        }

        demo = new Test(quilt,mode);

        demo.nextFrame = function(pct){
          this.fieldOfVision = 35;
          this.parallaxRatio = 1;
          this.update();
        }

        //---------------

        encoder = new FFMpegCaptureManager(new FFmpegCommand(ffmpegConfig));
        encoder.addEventListener(FFMpegCaptureManager.FILE_CREATION_COMPLETED,function(e){ console.log("FILE CREATED") })
        encoder.addEventListener(FFMpegCaptureManager.FRAME_ENCODED,function(e){ console.log("encodingProgress = ",encoder.encodingProgress)})

        demo.onReady = function(){  encoder.start(demo,"nextFrame")  }

      }
'''

If you want to record a quilt-video, just set the variable "createQuiltVideo" to true. 
If you want to create a quilt-video bigger than 4096x4096, you must use "libx265" as  encoderType. 

Launch holoplayToMp4.exe to launch the capture and press F12 to open the console

