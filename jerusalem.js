function jerusalemCube(p1, p2, p3, p4, p5, p6, p7, p8, count) {
	if(count < 1) {
		cube(p1, p2, p3, p4, p5, p6, p7, p8);
	}
	else {
		count--;
	
		var distance = distance(p3, p4);
		var smallCube = (1/6) * distance;
		var bigCube = (distance - smallCube)/2;

		// Front face cubes
		var front_top_left_1 = [p4[0], p4[1] - bigCube, p4[2]];
		var front_top_left_2 = [p4[0] + bigCube, p4[1] - bigCube, p4[2]];
		var front_top_left_3 = [p4[0] + bigCube, p4[1], p4[2]];
		var front_top_left_4 = p4;
		var front_top_left_5 = [front_top_left_1[0], front_top_left_1[1], front_top_left_1[2] - bigCube];
		var front_top_left_6 = [front_top_left_2[0], front_top_left_2[1], front_top_left_2[2] - bigCube];
		var front_top_left_7 = [front_top_left_3[0], front_top_left_3[1], front_top_left_3[2] - bigCube];
		var front_top_left_8 = [front_top_left_4[0], front_top_left_4[1], front_top_left_4[2] - bigCube];

		var front_top_center_1 = [p4[0] + bigCube, p4[1] - smallCube, p4[2]];
		var front_top_center_2 = [p4[0] + bigCube + smallCube, p4[1] - smallCube, p4[2]];
		var front_top_center_3 = [p4[0] + bigCube + smallCube, p4[1], p4[2]];
		var front_top_center_4 = [p4[0] + bigCube, p4[1], p4[2]];
		var front_top_center_5 = [front_top_center_1[0], front_top_center_1[1], front_top_center_1[2] - smallCube];
		var front_top_center_6 = [front_top_center_2[0], front_top_center_2[1], front_top_center_2[2] - smallCube];
		var front_top_center_7 = [front_top_center_3[0], front_top_center_3[1], front_top_center_3[2] - smallCube];
		var front_top_center_8 = [front_top_center_4[0], front_top_center_4[1], front_top_center_4[2] - smallCube];

		var front_top_right_1 = [p3[0] - bigCube, p3[1] - bigCube, p3[2]];;
		var front_top_right_2 = [p3[0], p3[1] - bigCube, p4[2]];
		var front_top_right_3 = p3;
		var front_top_right_4 = [p3[0] - bigCube, p3[1], p3[2]];
		var front_top_right_5 = [front_top_right_1[0], front_top_right_1[1], front_top_right_1[2] - bigCube];
		var front_top_right_6 = [front_top_right_2[0], front_top_right_2[1], front_top_right_2[2] - bigCube];
		var front_top_right_7 = [front_top_right_3[0], front_top_right_3[1], front_top_right_3[2] - bigCube];
		var front_top_right_8 = [front_top_right_4[0], front_top_right_4[1], front_top_right_4[2] - bigCube];

		var front_mid_left_1 = [p4[0], p4[1] - bigCube - smallCube, p4[2]];
		var front_mid_left_2 = [p4[0] + smallCube, p4[1] - bigCube - smallCube, p4[2]];
		var front_mid_left_3 = [p4[0] + smallCube, p4[1] - bigCube, p4[2]];
		var front_mid_left_4 = [p4[0], p4[1] - bigCube, p4[2]];
		var front_mid_left_5 = [front_mid_left_1[0], front_mid_left_1[1], front_mid_left_1[2] - smallCube];
		var front_mid_left_6 = [front_mid_left_2[0], front_mid_left_2[1], front_mid_left_2[2] - smallCube];
		var front_mid_left_7 = [front_mid_left_3[0], front_mid_left_3[1], front_mid_left_3[2] - smallCube];
		var front_mid_left_8 = [front_mid_left_4[0], front_mid_left_4[1], front_mid_left_4[2] - smallCube];

		var front_mid_right_1 = [p3[0] - smallCube, p3[1] - bigCube - smallCube, p3[2]];
		var front_mid_right_2 = [p3[0], p3[1] - bigCube - smallCube, p3[2]];
		var front_mid_right_3 = [p3[0], p3[1] - bigCube, p3[2]];
		var front_mid_right_4 = [p3[0] - smallCube, p3[1] - bigCube, p3[2]];
		var front_mid_right_5 = [front_mid_right_1[0], front_mid_right_1[1], front_mid_right_1[2] - smallCube];
		var front_mid_right_6 = [front_mid_right_2[0], front_mid_right_2[1], front_mid_right_2[2] - smallCube];
		var front_mid_right_7 = [front_mid_right_3[0], front_mid_right_3[1], front_mid_right_3[2] - smallCube];
		var front_mid_right_8 = [front_mid_right_4[0], front_mid_right_4[1], front_mid_right_4[2] - smallCube];

		var front_bot_left_1 = p1;
		var front_bot_left_2 = [p1[0] + bigCube, p1[1], p1[2]];
		var front_bot_left_3 = [p1[0] + bigCube, p1[1] + bigCube, p1[2]];
		var front_bot_left_4 = [p1[0], p1[1] + bigCube, p1[2]];
		var front_bot_left_5 = [front_bot_left_1[0], front_bot_left_1[1], front_bot_left_1[2] - bigCube];
		var front_bot_left_6 = [front_bot_left_2[0], front_bot_left_2[1], front_bot_left_2[2] - bigCube];
		var front_bot_left_7 = [front_bot_left_3[0], front_bot_left_3[1], front_bot_left_3[2] - bigCube];
		var front_bot_left_8 = [front_bot_left_4[0], front_bot_left_4[1], front_bot_left_4[2] - bigCube];

		var front_bot_center_1 = [p1[0] + bigCube, p1[1], p1[2]];
		var front_bot_center_2 = [p1[0] + bigCube + smallCube, p1[1], p1[2]];
		var front_bot_center_3 = [p1[0] + bigCube + smallCube, p1[1] + smallCube, p1[2]];
		var front_bot_center_4 = [p1[0] + bigCube, p1[1] + smallCube, p1[2]];
		var front_bot_center_5 = [front_bot_center_1[0], front_bot_center_1[1], front_bot_center_1[2] - smallCube];
		var front_bot_center_6 = [front_bot_center_2[0], front_bot_center_2[1], front_bot_center_2[2] - smallCube];
		var front_bot_center_7 = [front_bot_center_3[0], front_bot_center_3[1], front_bot_center_3[2] - smallCube];
		var front_bot_center_8 = [front_bot_center_4[0], front_bot_center_4[1], front_bot_center_4[2] - smallCube];

		var front_bot_right_1 = [p2[0] - bigCube, p2[1], p2[2]];
		var front_bot_right_2 = p2;
		var front_bot_right_3 = [p2[0], p2[1] + bigCube, p2[2]];
		var front_bot_right_4 = [p2[0] - bigCube, p2[1] + bigCube, p2[2]];
		var front_bot_right_5 = [front_bot_right_1[0], front_bot_right_1[1], front_bot_right_1[2] - bigCube];
		var front_bot_right_6 = [front_bot_right_2[0], front_bot_right_2[1], front_bot_right_2[2] - bigCube];
		var front_bot_right_7 = [front_bot_right_3[0], front_bot_right_3[1], front_bot_right_3[2] - bigCube];
		var front_bot_right_8 = [front_bot_right_4[0], front_bot_right_4[1], front_bot_right_4[2] - bigCube];

		// Mid cubes
		var mid_top_left_1 = [p4[0], p4[1] - smallCube, p4[2] - bigCube];
		var mid_top_left_2 = [p4[0] + smallCube, p4[1] - smallCube, p4[2] - bigCube];
		var mid_top_left_3 = [p4[0] + smallCube, p4[1], p4[2] - bigCube];
		var mid_top_left_4 = [p4[0], p4[1], p4[2] - bigCube];
		var mid_top_left_5 = [mid_top_left_1[0], mid_top_left_1[1], mid_top_left_1[2] - smallCube];
		var mid_top_left_6 = [mid_top_left_2[0], mid_top_left_2[1], mid_top_left_2[2] - smallCube];
		var mid_top_left_7 = [mid_top_left_3[0], mid_top_left_3[1], mid_top_left_3[2] - smallCube];
		var mid_top_left_8 = [mid_top_left_4[0], mid_top_left_4[1], mid_top_left_4[2] - smallCube];

		var mid_top_right_1 = [p3[0] - smallCube, p3[1] - smallCube, p3[2] - bigCube];
		var mid_top_right_2 = [p3[0], p3[1] - smallCube, p3[2] - bigCube];
		var mid_top_right_3 = [p3[0], p3[1], p3[2] - bigCube];
		var mid_top_right_4 = [p3[0] - smallCube, p3[1], p3[2] - bigCube];
		var mid_top_right_5 = [mid_top_right_1[0], mid_top_right_1[1], mid_top_right_1[2] - smallCube];
		var mid_top_right_6 = [mid_top_right_2[0], mid_top_right_2[1], mid_top_right_2[2] - smallCube];
		var mid_top_right_7 = [mid_top_right_3[0], mid_top_right_3[1], mid_top_right_3[2] - smallCube];
		var mid_top_right_8 = [mid_top_right_4[0], mid_top_right_4[1], mid_top_right_4[2] - smallCube];

		var mid_bot_left_1 = [p1[0], p1[1], p2[2] - bigCube];
		var mid_bot_left_2 = [p1[0] + smallCube, p1[1], p1[2] - bigCube];
		var mid_bot_left_3 = [p1[0] + smallCube, p1[1] + smallCube, p1[2] - bigCube];
		var mid_bot_left_4 = [p1[0], p1[1] + smallCube, p1[2] - bigCube];
		var mid_bot_left_5 = [mid_bot_left_1[0], mid_bot_left_1[1], mid_bot_left_1[2] - smallCube];
		var mid_bot_left_6 = [mid_bot_left_2[0], mid_bot_left_2[1], mid_bot_left_2[2] - smallCube];
		var mid_bot_left_7 = [mid_bot_left_3[0], mid_bot_left_3[1], mid_bot_left_3[2] - smallCube];
		var mid_bot_left_8 = [mid_bot_left_4[0], mid_bot_left_4[1], mid_bot_left_4[2] - smallCube];

		var mid_bot_right_1 = [p2[0] - smallCube, p2[1], p2[2] - bigCube];
		var mid_bot_right_2 = [p2[0], p2[1], p2[2] - bigCube];
		var mid_bot_right_3 = [p2[0], p2[1] + smallCube, p2[2] - bigCube];
		var mid_bot_right_4 = [p2[0] - smallCube, p2[1] + smallCube, p2[2] - bigCube];
		var mid_bot_right_5 = [mid_bot_right_1[0], mid_bot_right_1[1], mid_bot_right_1[2] - smallCube];
		var mid_bot_right_6 = [mid_bot_right_2[0], mid_bot_right_2[1], mid_bot_right_2[2] - smallCube];
		var mid_bot_right_7 = [mid_bot_right_3[0], mid_bot_right_3[1], mid_bot_right_3[2] - smallCube];
		var mid_bot_right_8 = [mid_bot_right_4[0], mid_bot_right_4[1], mid_bot_right_4[2] - smallCube];

		// Back cubes
		var back_top_left_1 = [p4[0], p4[1] - bigCube, p4[2] - bigCube - smallCube];
		var back_top_left_2 = [p4[0] + bigCube, p4[1] - bigCube, p4[2] - bigCube - smallCube];
		var back_top_left_3 = [p4[0] + bigCube, p4[1], p4[2] - bigCube - smallCube];
		var back_top_left_4 = [p4[0], p4[1], p4[2] - bigCube - smallCube];
		var back_top_left_5 = [back_top_left_1[0], back_top_left_1[1], back_top_left_1[2] - bigCube];
		var back_top_left_6 = [back_top_left_2[0], back_top_left_2[1], back_top_left_2[2] - bigCube];
		var back_top_left_7 = [back_top_left_3[0], back_top_left_3[1], back_top_left_3[2] - bigCube];
		var back_top_left_8 = [back_top_left_4[0], back_top_left_4[1], back_top_left_4[2] - bigCube];

		var back_top_center_1 = [p4[0] + bigCube, p4[1] - smallCube, p4[2] - (5*smallCube)];
		var back_top_center_2 = [p4[0] + bigCube + smallCube, p4[1] - smallCube, p4[2] - (5*smallCube)];
		var back_top_center_3 = [p4[0] + bigCube + smallCube, p4[1], p4[2] - (5*smallCube)];
		var back_top_center_4 = [p4[0] + bigCube, p4[1], p4[2] - (5*smallCube)];
		var back_top_center_5 = [back_top_center_1[0], back_top_center_1[1], back_top_center_1[2] - smallCube];
		var back_top_center_6 = [back_top_center_2[0], back_top_center_2[1], back_top_center_2[2] - smallCube];
		var back_top_center_7 = [back_top_center_3[0], back_top_center_3[1], back_top_center_3[2] - smallCube];
		var back_top_center_8 = [back_top_center_4[0], back_top_center_4[1], back_top_center_4[2] - smallCube];

		var back_top_right_1 = [p3[0] - bigCube, p3[1] - bigCube, p3[2] - bigCube - smallCube];;
		var back_top_right_2 = [p3[0], p3[1] - bigCube, p4[2] - bigCube - smallCube];
		var back_top_right_3 = [p3[0], p3[1], p3[2] - bigCube - smallCube];
		var back_top_right_4 = [p3[0] - bigCube, p3[1], p3[2] - bigCube - smallCube];
		var back_top_right_5 = [back_top_right_1[0], back_top_right_1[1], back_top_right_1[2] - bigCube];
		var back_top_right_6 = [back_top_right_2[0], back_top_right_2[1], back_top_right_2[2] - bigCube];
		var back_top_right_7 = [back_top_right_3[0], back_top_right_3[1], back_top_right_3[2] - bigCube];
		var back_top_right_8 = [back_top_right_4[0], back_top_right_4[1], back_top_right_4[2] - bigCube];

		var back_mid_left_1 = [p4[0], p4[1] - bigCube - smallCube, p4[2] - (2*bigCube)];
		var back_mid_left_2 = [p4[0] + smallCube, p4[1] - bigCube - smallCube, p4[2] - (2*bigCube)];
		var back_mid_left_3 = [p4[0] + smallCube, p4[1] - bigCube, p4[2] - (2*bigCube)];
		var back_mid_left_4 = [p4[0], p4[1] - bigCube, p4[2] - (2*bigCube)];
		var back_mid_left_5 = [back_mid_left_1[0], back_mid_left_1[1], back_mid_left_1[2] - smallCube];
		var back_mid_left_6 = [back_mid_left_2[0], back_mid_left_2[1], back_mid_left_2[2] - smallCube];
		var back_mid_left_7 = [back_mid_left_3[0], back_mid_left_3[1], back_mid_left_3[2] - smallCube];
		var back_mid_left_8 = [back_mid_left_4[0], back_mid_left_4[1], back_mid_left_4[2] - smallCube];

		var back_mid_right_1 = [p3[0] - smallCube, p3[1] - bigCube - smallCube, p3[2] - (2*bigCube)];
		var back_mid_right_2 = [p3[0], p3[1] - bigCube - smallCube, p3[2] - (2*bigCube)];
		var back_mid_right_3 = [p3[0], p3[1] - bigCube, p3[2] - (2*bigCube)];
		var back_mid_right_4 = [p3[0] - smallCube, p3[1] - bigCube, p3[2] - (2*bigCube)];
		var back_mid_right_5 = [back_mid_right_1[0], back_mid_right_1[1], back_mid_right_1[2] - smallCube];
		var back_mid_right_6 = [back_mid_right_2[0], back_mid_right_2[1], back_mid_right_2[2] - smallCube];
		var back_mid_right_7 = [back_mid_right_3[0], back_mid_right_3[1], back_mid_right_3[2] - smallCube];
		var back_mid_right_8 = [back_mid_right_4[0], back_mid_right_4[1], back_mid_right_4[2] - smallCube];

		var back_bot_left_1 = [p1[0], p1[1], p1[2] - bigCube - smallCube];
		var back_bot_left_2 = [p1[0] + bigCube, p1[1], p1[2] - bigCube - smallCube];
		var back_bot_left_3 = [p1[0] + bigCube, p1[1] + bigCube, p1[2] - bigCube - smallCube];
		var back_bot_left_4 = [p1[0], p1[1] + bigCube, p1[2] - bigCube - smallCube];
		var back_bot_left_5 = [back_bot_left_1[0], back_bot_left_1[1], back_bot_left_1[2] - bigCube];
		var back_bot_left_6 = [back_bot_left_2[0], back_bot_left_2[1], back_bot_left_2[2] - bigCube];
		var back_bot_left_7 = [back_bot_left_3[0], back_bot_left_3[1], back_bot_left_3[2] - bigCube];
		var back_bot_left_8 = [back_bot_left_4[0], back_bot_left_4[1], back_bot_left_4[2] - bigCube];

		var back_bot_center_1 = [p1[0] + bigCube, p1[1], p1[2] - (5*smallCube)];
		var back_bot_center_2 = [p1[0] + bigCube + smallCube, p1[1], p1[2] - (5*smallCube)];
		var back_bot_center_3 = [p1[0] + bigCube + smallCube, p1[1] + smallCube, p1[2] - (5*smallCube)];
		var back_bot_center_4 = [p1[0] + bigCube, p1[1] + smallCube, p1[2] - (5*smallCube)];
		var back_bot_center_5 = [back_bot_center_1[0], back_bot_center_1[1], back_bot_center_1[2] - smallCube];
		var back_bot_center_6 = [back_bot_center_2[0], back_bot_center_2[1], back_bot_center_2[2] - smallCube];
		var back_bot_center_7 = [back_bot_center_3[0], back_bot_center_3[1], back_bot_center_3[2] - smallCube];
		var back_bot_center_8 = [back_bot_center_4[0], back_bot_center_4[1], back_bot_center_4[2] - smallCube];

		var back_bot_right_1 = [p2[0] - bigCube, p2[1], p2[2] - bigCube - smallCube];
		var back_bot_right_2 = [p2[0], p2[1], p2[2] - bigCube - smallCube];
		var back_bot_right_3 = [p2[0], p2[1] + bigCube, p2[2] - bigCube - smallCube];
		var back_bot_right_4 = [p2[0] - bigCube, p2[1] + bigCube, p2[2] - bigCube - smallCube];
		var back_bot_right_5 = [back_bot_right_1[0], back_bot_right_1[1], back_bot_right_1[2] - bigCube];
		var back_bot_right_6 = [back_bot_right_2[0], back_bot_right_2[1], back_bot_right_2[2] - bigCube];
		var back_bot_right_7 = [back_bot_right_3[0], back_bot_right_3[1], back_bot_right_3[2] - bigCube];
		var back_bot_right_8 = [back_bot_right_4[0], back_bot_right_4[1], back_bot_right_4[2] - bigCube];


		jerusalemCube(front_top_left_1, front_top_left_2, front_top_left_3, front_top_left_4, front_top_left_5, front_top_left_6, front_top_left_7, front_top_left_8, count);
		jerusalemCube(front_top_center_1, front_top_center_2, front_top_center_3, front_top_center_4, front_top_center_5, front_top_center_6, front_top_center_7, front_top_center_8, count);
		jerusalemCube(front_top_right_1, front_top_right_2, front_top_right_3, front_top_right_4, front_top_right_5, front_top_right_6, front_top_right_7, front_top_right_8, count);
		jerusalemCube(front_mid_left_1, front_mid_left_2, front_mid_left_3, front_mid_left_4, front_mid_left_5, front_mid_left_6, front_mid_left_7, front_mid_left_8, count);
		jerusalemCube(front_mid_right_1, front_mid_right_2, front_mid_right_3, front_mid_right_4, front_mid_right_5, front_mid_right_6, front_mid_right_7, front_mid_right_8, count);
		jerusalemCube(front_bot_left_1, front_bot_left_2, front_bot_left_3, front_bot_left_4, front_bot_left_5, front_bot_left_6, front_bot_left_7, front_bot_left_8, count);
		jerusalemCube(front_bot_center_1, front_bot_center_2, front_bot_center_3, front_bot_center_4, front_bot_center_5, front_bot_center_6, front_bot_center_7, front_bot_center_8, count);
		jerusalemCube(front_bot_right_1, front_bot_right_2, front_bot_right_3, front_bot_right_4, front_bot_right_5, front_bot_right_6, front_bot_right_7, front_bot_right_8, count);

		jerusalemCube(mid_top_left_1, mid_top_left_2, mid_top_left_3, mid_top_left_4, mid_top_left_5, mid_top_left_6, mid_top_left_7, mid_top_left_8, count);
		jerusalemCube(mid_top_right_1, mid_top_right_2, mid_top_right_3, mid_top_right_4, mid_top_right_5, mid_top_right_6, mid_top_right_7, mid_top_right_8, count);
		jerusalemCube(mid_bot_left_1, mid_bot_left_2, mid_bot_left_3, mid_bot_left_4, mid_bot_left_5, mid_bot_left_6, mid_bot_left_7, mid_bot_left_8, count);
		jerusalemCube(mid_bot_right_1, mid_bot_right_2, mid_bot_right_3, mid_bot_right_4, mid_bot_right_5, mid_bot_right_6, mid_bot_right_7, mid_bot_right_8, count);
	
		jerusalemCube(back_top_left_1, back_top_left_2, back_top_left_3, back_top_left_4, back_top_left_5, back_top_left_6, back_top_left_7, back_top_left_8, count);
		jerusalemCube(back_top_center_1, back_top_center_2, back_top_center_3, back_top_center_4, back_top_center_5, back_top_center_6, back_top_center_7, back_top_center_8, count);
		jerusalemCube(back_top_right_1, back_top_right_2, back_top_right_3, back_top_right_4, back_top_right_5, back_top_right_6, back_top_right_7, back_top_right_8, count);
		jerusalemCube(back_mid_left_1, back_mid_left_2, back_mid_left_3, back_mid_left_4, back_mid_left_5, back_mid_left_6, back_mid_left_7, back_mid_left_8, count);
		jerusalemCube(back_mid_right_1, back_mid_right_2, back_mid_right_3, back_mid_right_4, back_mid_right_5, back_mid_right_6, back_mid_right_7, back_mid_right_8, count);
		jerusalemCube(back_bot_left_1, back_bot_left_2, back_bot_left_3, back_bot_left_4, back_bot_left_5, back_bot_left_6, back_bot_left_7, back_bot_left_8, count);
		jerusalemCube(back_bot_center_1, back_bot_center_2, back_bot_center_3, back_bot_center_4, back_bot_center_5, back_bot_center_6, back_bot_center_7, back_bot_center_8, count);
		jerusalemCube(back_bot_right_1, back_bot_right_2, back_bot_right_3, back_bot_right_4, back_bot_right_5, back_bot_right_6, back_bot_right_7, back_bot_right_8, count);
	}
}