      google.charts.load('current', { 'packages': ['gantt'] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {

          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Task ID');
          data.addColumn('string', 'Task Name');
          data.addColumn('string', 'Resource');
          data.addColumn('date', 'Start Date');
          data.addColumn('date', 'End Date');
          data.addColumn('number', 'Duration');
          data.addColumn('number', 'Percent Complete');
          data.addColumn('string', 'Dependencies');

          data.addRows([
              ['Docs1', 'Private Beta Developer Docs', 'documentation', new Date(2016, 6, 01), new Date(2016, 6, 30), null, 0, null],
              ['OpR1', 'Platform Health', 'operational-readiness', new Date(2016, 6, 01), new Date(2016, 6, 30), null, 0, null],
              ['Postgres', 'Postgres Production', 'backing-service', new Date(2016, 6, 01), new Date(2016, 6, 30), null, 0, null],
              ['Postgres1', 'Postgres Admin', 'backing-service', new Date(2016, 6, 01), new Date(2016, 6, 30), null, 0, null],
              ['Postgres2', 'Postgres Data Import', 'backing-service', new Date(2016, 7, 01), new Date(2016, 7, 30), null, 0, null],
              ['Postgres3', 'Postgres Data Export', 'backing-service', new Date(2016, 7, 01), new Date(2016, 7, 30), null, 0, null],
              ['Prototype1', 'GDS Prototyping', 'tenant', new Date(2016, 7, 01), new Date(2016, 7, 30), null, 0, null],
              ['Redis', 'Redis', 'backing-service', new Date(2016, 7, 01), new Date(2016, 7, 30), null, 0, null],
              ['UserManagement', 'Tenant User Management', 'self-service', new Date(2016, 7, 01), new Date(2016, 7, 30), null, 0, null],
              ['ElasticSearch', 'ElasticSearch', 'backing-service', new Date(2016, 7, 01), new Date(2016, 7, 30), null, 0, null],
              ['govuk1', 'Bouncer', 'tenant', new Date(2016, 8, 01), new Date(2016, 8, 30), null, 0, 'Redis'],
              ['govuk2', 'Transition', 'tenant', new Date(2016, 8, 01), new Date(2016, 8, 30), null, 0, 'Redis'],
              ['DMp', 'Digital Marketplace', 'tenant', new Date(2016, 9, 01), new Date(2016, 9, 30), null, 0, 'Postgres,ElasticSearch'],
              ['PF', 'People Finder', 'tenant', new Date(2016, 9, 01), new Date(2016, 9, 30), null, 0, 'Postgres,ElasticSearch'],
              ['SSLCertManagement', 'Tenant SSL Cert Management', 'self-service', new Date(2016, 8, 01), new Date(2016, 8, 30), null, 0, null],
              ['Notification', 'Tenant Notification', 'self-service', new Date(2016, 8, 01), new Date(2016, 8, 30), null, 0, null],
              ['CDN', 'CDN', 'operational-readiness', new Date(2016, 8, 01), new Date(2016, 8, 30), null, 0, null],
              ['PP', 'Performance Platform', 'tenant', new Date(2016, 9, 01), new Date(2016, 9, 30), null, 0, 'Postgres'],
              ['MongoDB', 'Mongo DB', 'backing-service', new Date(2016, 9, 01), new Date(2016, 9, 30), null, 0, null],
              ['govuk3', 'Gov.uk Content Store', 'tenant', new Date(2016, 10, 01), new Date(2016, 10, 30), null, 0, null],
              ['govuk4', 'Gov.uk Attachments', 'tenant', new Date(2016, 10, 01), new Date(2016, 10, 30), null, 0, null],
              ['gaap1', 'Notify', 'tenant', new Date(2016, 10, 01), new Date(2016, 10, 30), null, 0, null],
          ]);

          var options = {
              height: 800,
              gantt: {
                  trackHeight: 30,
                  percentEnabled: false,
                  labelStyle: {
                      fontName: "nta",
                      fontSize: 14
                  },
              }
          };

          var chart = new google.visualization.Gantt(document.getElementById('chart_div'));

          chart.draw(data, options);
      }
