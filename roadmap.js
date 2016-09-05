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
              // ['Docs1', 'Private Beta Developer Docs', 'documentation', new Date(2016, 06, 01), new Date(2016, 06, 30), null, 0, null],
              // ['Docs2', 'Postgres Docs', 'documentation', new Date(2016, 06, 01), new Date(2016, 06, 30), null, 0, null],
              ['OpR1', 'Platform Health', 'operational-readiness', new Date(2016, 09, 01), new Date(2016, 09, 30), null, 0, null],
              // ['Postgres', 'Postgres Production', 'backing-service', new Date(2016, 05, 01), new Date(2016, 05, 30), null, 0, null],
              // ['tt', 'Trade Tariff', 'tenant', new Date(2016, 06, 01), new Date(2016, 06, 5), null, 0, 'Postgres'],
              ['Postgres1', 'Postgres Admin', 'backing-service', new Date(2016, 06, 01), new Date(2016, 06, 30), null, 0, null],
              ['Postgres2', 'Postgres Data Import', 'backing-service', new Date(2016, 07, 01), new Date(2016, 07, 30), null, 0, null],
              ['Postgres3', 'Postgres Data Export', 'backing-service', new Date(2016, 07, 01), new Date(2016, 07, 30), null, 0, null],
              ['Prototype1', 'GDS Prototyping', 'tenant', new Date(2016, 07, 01), new Date(2016, 07, 5), null, 0, null],
              ['Redis', 'Redis', 'backing-service', new Date(2016, 07, 01), new Date(2016, 07, 30), null, 0, null],
              ['UserManagement', 'Tenant User Management', 'self-service', new Date(2016, 07, 01), new Date(2016, 07, 30), null, 0, null],
              ['ElasticSearch', 'ElasticSearch', 'backing-service', new Date(2016, 07, 01), new Date(2016, 07, 30), null, 0, null],
              ['govuk1', 'Bouncer', 'tenant', new Date(2016, 08, 01), new Date(2016, 08, 5), null, 0, 'Redis'],
              ['govuk2', 'Transition', 'tenant', new Date(2016, 08, 01), new Date(2016, 08, 5), null, 0, 'Redis'],
              ['DMp', 'Digital Marketplace', 'tenant', new Date(2016, 09, 01), new Date(2016, 09, 5), null, 0, 'Postgres,ElasticSearch'],
              ['PF', 'People Finder', 'tenant', new Date(2016, 09, 01), new Date(2016, 09, 5), null, 0, 'Postgres,ElasticSearch'],
              ['SSLCertManagement', 'Tenant SSL Cert Management', 'self-service', new Date(2016, 08, 01), new Date(2016, 08, 30), null, 0, null],
              ['Notification', 'Tenant Notification', 'self-service', new Date(2016, 08, 01), new Date(2016, 08, 30), null, 0, null],
              ['CDN', 'CDN', 'operational-readiness', new Date(2016, 08, 01), new Date(2016, 08, 30), null, 0, null],
              ['PP', 'Performance Platform', 'tenant', new Date(2016, 09, 01), new Date(2016, 09, 5), null, 0, 'Postgres'],
              ['MongoDB', 'Mongo DB', 'backing-service', new Date(2016, 09, 01), new Date(2016, 09, 30), null, 0, null],
              ['AWSSQS', 'AWS SQS', 'backing-service', new Date(2016, 09, 01), new Date(2016, 09, 30), null, 0, null],
              ['govuk3', 'Gov.uk Content Store', 'tenant', new Date(2016, 10, 01), new Date(2016, 10, 5), null, 0, null],
              ['govuk4', 'Gov.uk Attachments', 'tenant', new Date(2016, 10, 01), new Date(2016, 10, 5), null, 0, null],
              ['gaap1', 'Notify', 'tenant', new Date(2016, 10, 01), new Date(2016, 10, 5), null, 0, 'AWSSQS,Postgres'],
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
