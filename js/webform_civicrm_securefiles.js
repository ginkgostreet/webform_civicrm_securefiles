(function ($, D) {

  function handleSecureFilesUpload(event, obj) {
    event.preventDefault();
    //todo: Figure out ts()
    obj.parent().find(".securefiles_upload_submit").val("Uploading...");
    obj.trigger("securefiles_upload");
  }

  function resetSecureFiles(event, obj) {
    obj.parent().find(".securefiles_upload_submit").show();
    obj.parent().find(".securefiles_uploaded_filename").html("");
    obj.parent().find(".securefiles_information_container").hide();
    obj.show();
    event.preventDefault();
    return false;
  }

  function setupSecureFiles(obj) {
    //todo: Figure out ts()
    setTimeout(function() {
      obj.parent().find(".form-submit.ajax-processed").not(".securefiles_upload_submit").remove();
    }, 100);

    var newButton = $('<input type="submit" value="Upload" class="securefiles_upload_submit form-submit ajax-processed">');
    newButton.click(function(event) {
      handleSecureFilesUpload(event, obj);
    });
    obj.after(newButton);

    var fieldId = obj.attr("id").replace(/.*custom_/g, "");
    newButton.after("<input type='hidden' class='securefiles_upload_metadata' name='securefiles_metadata[" + fieldId + "]' />");

    var extras = $("<div class='securefiles_information_container'><span class='securefiles_uploaded_filename'></span></div>");
    var removeButton = $("<button>Upload Different File</button>");

    removeButton.click(function(event) {
      resetSecureFiles(event, obj);
    });

    extras.append(removeButton);
    obj.parent().before(extras);
    extras.hide();
  }


  $(".securefiles_upload input:file").each(function() {
    setupSecureFiles($(this));
  });


  $(".securefiles_upload input:file").on("securefiles_upload_complete", function(event, data) {
    var obj = $(event.target);
    var fileTitle = data.name.replace(/.*\//g, "");

    //todo: Figure out ts()
    var objParent = obj.closest(".form-item");
    objParent.find(".securefiles_upload_metadata").val(JSON.stringify(data));
    objParent.find(".securefiles_upload_submit").val("Upload");
    objParent.find(".securefiles_upload_submit").hide();
    objParent.find(".securefiles_uploaded_filename").html(fileTitle);
    objParent.find(".securefiles_information_container").show();
    obj.hide();
  });

})(jQuery, Drupal);