+function summaryDisplay(){
    function loadSummary(s){
        DisplayWindow.setVisibility(false);
        var params = s.params;
        var _env = {
            mode: {name: 'Summary', slug: 'summary'},
            state: state,
            lga: lga,
            sector: Sectors.pluck(params.sector) || overviewObj
        };
        var bcValues = prepBreadcrumbValues(_env,
                        "state lga mode sector subsector indicator".split(" "),
                        {state:state,lga:lga});
        NMIS.Breadcrumb.clear();
    	NMIS.Breadcrumb.setLevels(bcValues);
    	log(_env.sector)
        NMIS.LocalNav.markActive(["mode:summary", "sector:" + _env.sector.slug]);
        NMIS.LocalNav.iterate(function(sectionType, buttonName, a){
            var env = _.extend({}, _env);
            env[sectionType] = buttonName;
            a.attr('href', NMIS.urlFor(env));
        });
        (function displayConditionalContent(sector){
            var cc = $('#conditional-content').hide();
            cc.find('>div').hide();
            cc.find('>div.lga.'+sector.slug).show();
            cc.show();
        })(_env.sector);
    }
    dashboard = $.sammy(function(){
        this.get("/nmis~/:state/:lga/summary/?", loadSummary);
        this.get("/nmis~/:state/:lga/summary/:sector/?", loadSummary);
        this.get("/nmis~/:state/:lga/summary/:sector/:subsector/?", loadSummary);
        this.get("/nmis~/:state/:lga/summary/:sector/:subsector/:indicator/?", loadSummary);
    });
}()