      google.charts.load('current', { 'packages': ['timeline'] });
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
          var container = document.getElementById('timeline');
          var chart = new google.visualization.Timeline(container);
          var dataTable = new google.visualization.DataTable();

          dataTable.addColumn({ type: 'string', id: 'Theme' });
          dataTable.addColumn({ type: 'string', id: 'Name' });
          dataTable.addColumn({ type: 'string', role: 'tooltip' });
          dataTable.addColumn({ type: 'date', id: 'Start' });
          dataTable.addColumn({ type: 'date', id: 'End' });
          dataTable.addRows([
              // ['Tenant', 'Trade Tariff', '2441255', new Date(2016, 06, 01), new Date(2016, 06, 5)],
              // ['Tenant', 'GDS Prototyping', 'TOOLTIP', new Date(2016, 07, 01), new Date(2016, 07, 5)],
              ['Tenant', 'HMPO Prototyping', 'TOOLTIP', new Date(2016, 09, 01), new Date(2016, 09, 5)],
              ['Tenant', 'DVSA Prototyping', 'TOOLTIP', new Date(2016, 09, 01), new Date(2016, 09, 5)],
              ['Tenant', 'Bouncer', 'TOOLTIP', new Date(2016, 08, 20), new Date(2016, 08, 25)],
              ['Tenant', 'Transition', 'TOOLTIP', new Date(2016, 08, 20), new Date(2016, 08, 25)],
              ['Tenant', 'Digital Marketplace', 'TOOLTIP', new Date(2016, 08, 01), new Date(2016, 08, 5)],
              ['Tenant', 'People Finder', 'TOOLTIP', new Date(2016, 11, 01), new Date(2016, 11, 5)],
              ['Tenant', 'Performance Platform', 'TOOLTIP', new Date(2016, 08, 01), new Date(2016, 08, 5)],
              ['Tenant', 'Digital Marketplace', 'TOOLTIP', new Date(2017, 02, 01), new Date(2017, 02, 5)],
              ['Tenant', 'Gov.uk Content Store', 'TOOLTIP', new Date(2017, 01, 01), new Date(2017, 01, 5)],
              ['Tenant', 'Gov.uk Attachments', 'TOOLTIP', new Date(2017, 02, 01), new Date(2017, 02, 5)],
              // ['Tenant', 'Notify', 'TOOLTIP', new Date(2016, 10, 01), new Date(2016, 10, 5)],
              ['Tenant', 'Verify CSP', 'TOOLTIP', new Date(2016, 09, 01), new Date(2016, 09, 5)],
              ['Tenant', 'UKTI Export Wins', '2966765', new Date(2016, 11, 01), new Date(2016, 11, 5)],
              ['Self Service', 'User Management', '2462153', new Date(2016, 10, 01), new Date(2016, 10, 05)],
              ['Self Service', 'SSL Cert Management', 'TOOLTIP', new Date(2016, 11, 01), new Date(2016, 11, 05)],
              ['Self Service', 'User Notification', '2421711', new Date(2016, 09, 01), new Date(2016, 09, 05)],
              // ['Backing Service', 'Postgres Production', '2445837', new Date(2016, 05, 01), new Date(2016, 05, 05)],
              // ['Backing Service', 'Postgres Admin', '2485759', new Date(2016, 06, 01), new Date(2016, 06, 05)],
              ['Backing Service', 'Redis', 'TOOLTIP', new Date(2016, 08, 20), new Date(2016, 08, 25)],
              ['Backing Service', 'ElasticSearch', 'TOOLTIP', new Date(2016, 09, 15), new Date(2016, 09, 20)],
              ['Backing Service', 'Mongo DB', 'TOOLTIP', new Date(2016, 10, 20), new Date(2016, 10, 25)],
              ['Operational Readiness', 'Platform Health', '2492569', new Date(2016, 09, 01), new Date(2016, 09, 05)],
              ['Operational Readiness', 'Published Costs', '', new Date(2016, 10, 01), new Date(2016, 10, 05)],
              // ['Operational Readiness', 'CDN', 'TOOLTIP', new Date(2016, 11, 01), new Date(2016, 11, 05)],
              // ['Documentation', 'Developer Docs', '2313529', new Date(2016, 06, 01), new Date(2016, 06, 05)],
              // ['Documentation', 'Postgres Docs', '2465983', new Date(2016, 06, 01), new Date(2016, 06, 05)]
              ['Security', 'Remove Whitelist', '', new Date(2016, 10, 01), new Date(2016, 10, 05)],
              ['Security', 'Personal Info Storage', '', new Date(2016, 10, 15), new Date(2016, 10, 20)]
          ]);

          var options = {
              height: 800,
              tooltip: {
                  trigger: 'none'
              },
              timeline: {
                  colorByRowLabel: true,
                  rowLabelStyle: { fontName: 'nta', fontSize: 18 },
                  barLabelStyle: { fontName: 'nta', fontSize: 14 }
              }
          };

          function selectHandler(e) {
              var selection = chart.getSelection();
              var selectedRow = selection[0].row;
              var container = document.getElementById('thinginfo');
              container.innerHTML = getHTMLForEpic(selectedRow);
          }

          function getHTMLForEpic(selectedRow) {
              var thing = '<h1 class="heading-medium">' + dataTable.getValue(selectedRow, 0) + ' > ' + dataTable.getValue(selectedRow, 1) + '</h1>';
              var epicId = 'Check out the epic in <a href="https://www.pivotaltracker.com/epic/show/' + dataTable.getValue(selectedRow, 2) + '" target="_blank">Pivotal</a> (requires login)';
              return thing + epicId;
          }

          chart.draw(dataTable, options);
          google.visualization.events.addListener(chart, 'select', selectHandler);
      }
