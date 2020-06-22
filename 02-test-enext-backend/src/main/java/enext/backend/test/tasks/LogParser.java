package enext.backend.test.tasks;

import  enext.backend.test.models.Game;
import java.util.ArrayList;
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class LogParser {
    static private final ArrayList<Game> games = new ArrayList<Game>();
    static private final String filePath = "../data/games.log";

    public static void executar() {
        try {
            File file = new File(filePath);
            Scanner reader = new Scanner(file);


            Game newGame = null;

            while (reader.hasNextLine()) {
                String line = reader.nextLine();
                String lineLowerCase = line.toLowerCase();

                if (lineLowerCase.indexOf("initgame:") != -1) {
                    if (newGame != null)
                        games.add(newGame);

                    newGame = new Game();
                }
                else if (lineLowerCase.indexOf("kill") != -1 && lineLowerCase.indexOf("killed") != -1) {
                    String[] pieces = line.split(": ");
                    String dataPiece = pieces[pieces.length - 1].trim();

                    String playerName1 = dataPiece.replaceAll("killed.*", "").trim();
                    String playerName2 = dataPiece.replaceAll(".*killed", "").replaceAll("by.*", "").trim();
                    String killModeName = dataPiece.replaceAll(".*killed.*by", "").trim();

                    newGame.setTotalKills();

                    newGame.setPlayer(playerName1);
                    newGame.setPlayer(playerName2);
                    newGame.updatePlayersKills(playerName1, playerName2);

                    newGame.setKillMode(killModeName);
                    newGame.updateKillMode(killModeName);
                }
            }
            reader.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static ArrayList<Game> getGames() {
        return games;
    }
    
    public static Game getGame(int id) {
    	Game game = null;

        for (int i = 0, size = games.size(); i < size; i++) {
        	if (i+1 == id) {
        		game = games.get(i);
        	}
        }

        return game;
    }
}