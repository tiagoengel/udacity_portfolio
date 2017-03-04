function cropImage(source, size) {
  let fileParts = source.split('.');
  let fileName = fileParts[0];
  let fileExt = fileParts[1];
  return {
    [`${fileName}_${size}`]: {
      options: {
        customOut: [
          '-resize', size+'^', '-gravity', 'center', '-extent', size
        ],
        engine: 'im',
        sizes: [
          {
            width: '100%',
            rename: false
          }
        ]
      },
      files: {
        [`images/${fileName}-${size}.${fileExt}`]: `images_src/${source}`
      }
    }
  }
}

module.exports = function(grunt) {

  grunt.initConfig({
    responsive_images: Object.assign(
      cropImage('banner.jpg', '1600x350'),
      cropImage('banner.jpg', '940x350'),
      cropImage('banner.jpg', '720x350'),
      cropImage('banner.jpg', '500x300'),
      cropImage('banner.jpg', '400x300'),
      cropImage('work-movie-trailler.png', '350x200'),
      cropImage('work-movie-trailler.png', '300x200'),
      cropImage('work-movie-trailler.png', '250x200'),
      cropImage('work-movie-trailler.png', '150x100'),
      cropImage('work-coming-soon.jpg', '350x200'),
      cropImage('work-coming-soon.jpg', '300x200'),
      cropImage('work-coming-soon.jpg', '250x200'),
      cropImage('work-coming-soon.jpg', '150x100')
    ),
    clean: {
      images: {
        src: ['images'],
      },
      dist: {
        src: ['dist']
      }
    },
    mkdir: {
      images: {
        options: {
          create: ['images']
        },
      },
      dist: {
        options: {
          create: ['dist']
        },
      },
    },
    autoprefixer: {
      options: {
        browsers: ['last 4 versions', 'ie 8', 'ie 9']
      },
      main: {
        src: 'css/main.css',
        dest: 'dist/main.css'
      },
    },
    watch: {
      css: {
        files: ['css/**.css'],
        tasks: ['autoprefixer'],
        options: {
          spawn: false,
        },
      },
    },
    connect: {
      server: {
        options: {
          port: 8000,
          hostname: '*'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');

  grunt.registerTask('images', ['clean:images', 'mkdir:images', 'responsive_images']);
  grunt.registerTask('css:watch', ['autoprefixer', 'watch:css'])
  grunt.registerTask('default', ['clean:dist', 'mkdir:dist', 'connect:server', 'css:watch']);


};
