#! bin/bash

#http://stackoverflow.com/questions/5607542/why-does-find-exec-mv-target-not-work-on-cygwin
cur_path=`pwd`
rails_js_path="app/assets/javascripts"
rails_css_path="app/assets/stylesheets"

css_dir_path="$cur_path/$rails_css_path"
js_dir_path="$cur_path/$rails_js_path"

##eval 會把所有後面的指令當文字看待 {}代表find出來的檔案
eval find $js_dir_path -regex '.*\.css' -exec mv {} $css_dir_path "\;"