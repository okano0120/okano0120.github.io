import $ from "jquery";
// import smoothscroll from 'smoothscroll-polyfill';
// smoothscroll.polyfill();

let app;
$(() => {
  return app.initialize();
})

app = {
  lastAnimation: 0,
  changeStep: (self, max) => {
    var step = Number($(self).attr('data-step'))
    if (step <= max - 1) {
      $(self).addClass(`step${step + 1 }`)
      $(self).attr('data-step', step + 1)
    } else {
      $('.commet').addClass('move')
      setTimeout(() => {
        $('.commet .commet-box').addClass('move')
      }, 100)
    }
  },

  setBind: () => {
    $('.material').on('transitionend', function (e) {
      if (e.originalEvent.timeStamp - app.lastAnimation > 500) {
        app.changeStep(this, 5)
      }
      app.lastAnimation = e.originalEvent.timeStamp
    })

    $('.commet .commet-box').one('transitionend', function (e) {
      if (e.originalEvent.timeStamp - app.lastAnimation > 500) {
        setTimeout(() => {
          $('.top-view').addClass('with_bk')
          $('.operate').removeClass('d-none')
          $('.commet .commet-box').addClass('away')
          $('.material').addClass('away')
          setTimeout(() => {
            $('.commet').css('display', 'none')
          }, 1500)
        }, 0)
      }
      app.lastAnimation = e.originalEvent.timeStamp
    })

    $('#modal').click(function (e) {
      if ($(e.target).hasClass('close')) {
        $('#modal').removeClass('open')
        setTimeout(() => {
          $('#modal').removeClass('ready')
        }, 700)
      }
    })

    $('.operate .buttons-box ul li').click(function () {
      $('#modal').addClass('ready')
      $('.section-content').removeClass('open')
      $(`#${$(this).attr('data-target')}`).addClass('open')
      if($(this).attr('data-target') == 'about' || $(this).attr('data-target') == 'company'){
        $('#modal .modal-content').removeClass('blue')
        $('#modal .modal-content').addClass('gray')
      } else if ($(this).attr('data-target') == 'recruit'){
        $('#modal .modal-content').removeClass('gray')
        $('#modal .modal-content').addClass('blue')
      } else {
        $('#modal .modal-content').removeClass('gray')
        $('#modal .modal-content').removeClass('blue')
      }
      setTimeout(() => {
        $('#modal').addClass('open')
      }, 100)
    })
  },
  initialize: () => {
    document.removeEventListener('touchmove', app.handleTouchMove);
    app.setBind()
    $('.material').addClass('step1')
  }
}