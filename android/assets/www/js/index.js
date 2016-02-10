/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var db;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');







// Database stuff
 db= window.sqlitePlugin.openDatabase({name: "my.db"});

  db.transaction(function(tx) {
    tx.executeSql('DROP TABLE IF EXISTS test_table');
    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (ID biginteger PRIMARY KEY, age integer,  eyeColor text, name text, gender text, company text, email text, about text, registered text  )');


    }, function(e) {
      console.log("ERROR: " + e.message);
    });
    $("#do_insert").show();





    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);




    }
};

app.initialize();


function doinsert() {
    alert("Lets Do It");
    var parameters=[],
        bigqery="";

    // magic
    db.transaction(function(tx) {

      console.time("TIME");
      $.each(raw_data, function(i ) {

                            bigqery += "(?,?,?, ?,?,?, ?,?,? )";
                            parameters.push(i, raw_data[i].age, raw_data[i].eyeColor, raw_data[i].name,  raw_data[i].gender, raw_data[i].company, raw_data[i].email,raw_data[i].about,raw_data[i].registered  );



                // sending   every 100 records to DB
                if (parameters.length ==900) {
                        tx.executeSql( "INSERT  INTO test_table  VALUES " + bigqery + ";", parameters  );
                        // reset the varriables
                        parameters= [];
                        bigqery = '';

                } else   bigqery += ",";





            })// end  foreach
         // send the rest of it
         if (bigqery !="")  {  tx.executeSql("INSERT INTO test_table   VALUES " + bigqery.slice(0,-1)+ ";",parameters, function(){
                $("#do_insert").hide();
                $("#do_select").show();
                console.timeEnd("TIME");
                alert("Finished,  please open the chrome console to see more details");
         })
         }








  })

}

function doselect() {
      db.executeSql('SELECT count(*) FROM test_table', [], function (res) {
        alert('Check SELECT result: ' + JSON.stringify(res.rows.item(0)));
      });

}