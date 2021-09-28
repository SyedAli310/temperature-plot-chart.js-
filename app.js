async function getData(){

    let years = []
    let temps = []

    let res = await fetch('data.csv')

    let data = await res.text()

    let rows = data.split('\n').slice(1)
    
    rows.forEach(row=>{
        let rowSplitted = row.split(',')
        let year = rowSplitted[0]
        let temp = rowSplitted[1]
        years.push(year)
        temps.push(parseFloat(temp) + 14)
        
    })

    return {temps,years}
      
}

async function makeChart(){
    const data = await getData()
    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = '#1b1b1b';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'line',
    plugins: [plugin],
    data: {
        labels: data.years,
        datasets: [{
            label: 'Average mean of temperatures year wise',
            data: data.temps,
            pointBackgroundColor: 'crimson',
            // backgroundColor: 'rgba(0, 181, 204, .5)',
            borderColor:'rgba(0, 181, 300, 1)',
            hoverBorderColor: "green",
            color:'red',
            borderWidth: 2,  
        }]
    },
    options: { 
        legend: {
            labels: {
                fontColor: "lightgreen",
                fontSize: 10
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    fontColor: "lightgreen",
                    fontSize: 10
                }
            }],
            xAxes: [{
                ticks: {
                    fontColor: "lightgreen",
                    fontSize: 10
                }
            }]
        }
    }
});
}

makeChart()

