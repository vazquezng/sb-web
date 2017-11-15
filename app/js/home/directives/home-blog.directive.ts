angular.module('Home')
.directive('homeBlog',['PATHS', '$http', homeBlog]);

function homeBlog(PATHS, $http){
    const tplBlog = <string> require('../views/blog.html');

    function link(scope, element, attrs) {
      $http.get(`${PATHS.api}/news`).then((resp) => {
        scope.news = resp.data.news.reverse();
      });
    }
    return {
        template: tplBlog,
        link: link
    };
}
