var program_data = {};
var object_data = {};


var w = 14;
var h = 11;
var cell_state = 
	"01110000001110" +
	"11111000011111" +
	"11111000011111" +
	"11111000001111" +
	"11111001111111" +
	"11111111111111" +
	"11111110011111" +
	"11110000011111" +
	"11111000011111" +
	"11111000011111" +
	"01110000001110";

var cell_style = 
	"00000000000000" +
	"00000000000000" +
	"00000000000000" +
	"00000001111111" +
	"11111110000001" +
	"10000000000001" +
	"10000001111111" +
	"11111110000000" +
	"00000000000000" +
	"00000000000000" +
	"00000000000000";

var object_pos = 
	"              " +
	"           uu " +
	" d            " +
	"              " +
	"              " +
	" c            " +
	"              " +
	"              " +
	" c            " +
	"           uu " +
	"              ";
var object_key = {
	d: "data_item",
	c: "credits",
	u: "upload_zone"
}

var program_pos = 
	"              " +
	"   AA         " +
	"  B A         " +
	"C   A         " +
	" D  A         " +
	"  E           " +
	"              " +
	" F            " +
	"             G" +
	"             G" +
	"              ";
var program_keys = {
	A: {
		type: "guard_dog",
		path: [[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]]
	}, B: {
		type: "guard_dog",
		path: [[2,2]]
	}, C: {
		type: "guard_dog",
		path: [[0,3]]
	}, D: {
		type: "guard_dog",
		path: [[1,4]]
	}, E: {
		type: "guard_dog",
		path: [[2,5]]
	}, F: {
		type: "guard_dog",
		path: [[1,7]]
	}, G: {
		type: "guard_dog",
		path: [[13,9],[13,8]]
	}
}

var size = 32

$(function () {
	$.get("json/enemy_programs.json", function(response) {
		program_data = response;

		setupGrid(d3.select(".battle .content svg"));
	});
	// $.get("json/objects.json");
});

function setupGrid(svg) {
	var icon_clipPath = $("body > svg .img-clip");
	if (icon_clipPath.length) svg.append("defs").append("clipPath").attr("id", "1-img-clip")
		.append(function() { return icon_clipPath.clone().get(0); });
	var cells_g = svg.append("g").classed("cells", true);
	var objects_g = svg.append("g").classed("objects", true);	
	var programs_g = svg.append("g").classed("programs", true);

	for (var key in program_keys) {
		var g = programs_g.append("g").classed(key, true);
		var color = d3.rgb(program_data[program_keys[key].type].color);
		program_keys[key].layer2 = g.append("g")
			.attr("fill", color.darker().toString());
		program_keys[key].layer1 = g.append("g")
			.attr("fill", color.toString());
		g.append("image")
			.attr("href", "img/programs/" + program_keys[key].type + ".png")
			.attr("width", size).attr("height", size).attr("clip-path", 'url(#1-img-clip)')
			//transform must be used instead of x and y because othewise the clip-path won't work
			.attr("transform", "translate(" +
				(program_keys[key].path[0][0] * size) + " " +
				(program_keys[key].path[0][1] * size) + ")");
	}

	for (var i = 0; i < w * h; i++) {
		var x = (i % w) * size;
		var y = Math.floor(i / w) * size;
		cells_g.append("image")
			.attr("width", size).attr("height", size)
			.attr("href", "img/tiles/" + cell_style[i] + ".png")
			.attr("x", x + 2).attr("y", y + 2)
			.style("visibility", (cell_state[i] === "0" || program_pos[i] !== " ") ? "hidden" : "");
		
		if (object_pos[i] !== " ")	objects_g.append("image")
			.attr("href", "img/objects/" + object_key[object_pos[i]] + ".png")
			.attr("width", size).attr("height", size)
			.attr("x", x + 2).attr("y", y + 2);

		if (program_pos[i] !== " ") {
			program_keys[program_pos[i]].layer1.append("use").attr("href", "#l1").attr("x", x).attr("y", y);
			program_keys[program_pos[i]].layer2.append("use").attr("href", "#l2_alt").attr("x", x).attr("y", y);

			if (i % w + 1 != w && program_pos[i + 1] === program_pos[i]) {
				program_keys[program_pos[i]].layer1.append("use").attr("href", "#E_l1").attr("x", x).attr("y", y);
				program_keys[program_pos[i]].layer2.append("use").attr("href", "#E_l2").attr("x", x).attr("y", y);
			}
			if (i + w < w * h && program_pos[i + w] === program_pos[i]) {
				program_keys[program_pos[i]].layer1.append("use").attr("href", "#S_l1").attr("x", x).attr("y", y);
				program_keys[program_pos[i]].layer2.append("use").attr("href", "#S_l2").attr("x", x).attr("y", y);
			}
		}
	}
}

