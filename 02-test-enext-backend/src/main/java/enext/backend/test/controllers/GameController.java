package enext.backend.test.controllers;

import enext.backend.test.models.Game;
import enext.backend.test.tasks.LogParser;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GameController {
	
	@GetMapping(path = "/api/game/{id}")
	public Game getPlayer(@PathVariable String id) {
		int _id = Integer.parseInt(id.replaceAll("\\D", ""));
		return LogParser.getGame(_id);
	}
}