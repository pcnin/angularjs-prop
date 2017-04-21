besgamApp
	.controller('tipsterGallery', function( $scope, $translate )
    {
        $scope.tipGallery = [
            {
                image: '/img/besgam-icons/icons/gallery-tipster-1.jpg',
                title: "tipster.howWork.gallery.title1",
                text: "tipster.howWork.gallery.text1"

            },
            {
                image: '/img/besgam-icons/icons/gallery-tipster-2.jpg',
                title: "tipster.howWork.gallery.title2",
                text: "tipster.howWork.gallery.text2"
            },
            {
                image: '/img/besgam-icons/icons/gallery-tipster-3.jpg',
                title: "tipster.howWork.gallery.title3",
                text: "tipster.howWork.gallery.text3"
            }
        ];

        // $translate('tipster.howWork.gallery.text3').then(function (translation) // "Deporte";
        // {
        //     $scope.titleSport = translation;
        // }); 


        $scope.aBefore = function()
        {
            $scope.varPrueba=true;
        }

        $scope.aAfter = function()
        {
            $scope.varPrueba = false;
        }

    });