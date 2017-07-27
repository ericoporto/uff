var min_w = 220; // minimum video width allowed
var vid_w_orig;  // original video dimensions
var vid_h_orig;

var mainboot = function(){
    var header = document.querySelector("header");
    // construct an instance of Headroom, passing the element
    var headroom = new Headroom(header, {
        tolerance: {
          down : 10,
          up : 20
        },
        offset : 205
    });
    // initialise
    headroom.init();

    vid_w_orig = 1920;
    vid_h_orig = 1080;

    function resizeToCover() {

        // set the video viewport to the window size
        blurImgdiv=document.getElementsByClassName('blurImg')[0];

        blurImgdiv.width=innerWidth;
        blurImgdiv.height=innerHeight/2;

        mainHeader=document.getElementsByClassName('mainheader')[0];

        // use largest scale factor of horizontal/vertical
        var scale_h = innerWidth / vid_w_orig;
        var scale_v = innerHeight / vid_h_orig;
        var scale = scale_h > scale_v ? scale_h : scale_v;

        // don't allow scaled width < minimum video width
        if (scale * vid_w_orig < min_w) {scale = min_w / vid_w_orig;};


        $(".mainheader").css("padding-top", 150*innerHeight/1080);
        $(".blurImg").css("height", 560*innerHeight/1080);

        // now scale the video
        full_videos=document.getElementsByClassName('fullscreen-bg__video');
        for(var i=0;i<full_videos.length;i++){
          full_videos[i].width=scale * vid_w_orig;
          full_videos[i].height=scale * vid_h_orig;
          // and center it by scrolling the video viewport
          blurImgdiv.scrollLeft=(full_videos[i].width - innerWidth) / 2;
          blurImgdiv.scrollTop=(full_videos[i].height - innerHeight) / 2;
        }
    };

    (function() {
        var throttle = function(type, name, obj) {
            obj = obj || window;
            var running = false;
            var func = function() {
                if (running) { return; }
                running = true;
                 requestAnimationFrame(function() {
                    obj.dispatchEvent(new CustomEvent(name));
                    running = false;
                });
            };
            obj.addEventListener(type, func);
        };

        /* init - you can init any event */
        throttle("resize", "optimizedResize");
    })();

    // handle event
    window.addEventListener("optimizedResize", resizeToCover);

    resizeToCover();




    (function() {
      $(window).scroll(function() {
        var oVal;
        oVal = window.scrollY / 240;
        return $(".blur").css("opacity", oVal);
      });

    }).call(this);

    reframe('fullscreen-bg__video');
}
