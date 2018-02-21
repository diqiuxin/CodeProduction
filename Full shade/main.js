$(clickMe).on('click', (event)=>{
  event.stopPropagation();
  $(shade).show();
  $(document).one('click', ()=>{
    $(shade).hide();
  })
});
$(stopPro).on("click",(event)=>{
  event.stopPropagation(); 
})

