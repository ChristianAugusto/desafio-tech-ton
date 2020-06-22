package enext.backend.test.tasks;

import  enext.backend.test.models.Game;
import  enext.backend.test.models.Player;
import java.util.ArrayList;

public class Task2 {
    static private final ArrayList<Player> allGamePlayers = new ArrayList<Player>();

    public static void executar() {
        setAllPlayers();
        System.out.println(printPlayerRanking());
    }

    public static void setAllPlayers() {
        for (Game auxG : LogParser.getGames()) {
            for (Player auxP : auxG.getPlayers()) {
                setPlayer(auxP.getName());
                updatePlayerKills(auxP.getName(), auxP.getKills());
            }
        }
    }

    public static void setPlayer(String playerName) {
        boolean hasPlayer = false;

        for (Player aux : allGamePlayers) {
            if (aux.getName().equals(playerName)) {
                hasPlayer = true;
            }
        }

        if (!hasPlayer)
            allGamePlayers.add(new Player(playerName, 0));
    }

    public static void updatePlayerKills(String playerName, int moreKills) {
        for (Player aux : allGamePlayers)
            if (aux.getName().equals(playerName))
                aux.setKills(aux.getKills() + moreKills);
    }

    public static String printPlayerRanking() {
        Player[] allGamePlayersArray = allGamePlayersToArray();


        if (allGamePlayersArray.length == 0)
            return "There are no players";


        for (int i = 0; i < allGamePlayersArray.length - 1; i++) {
            int position = i;

            for (int j = i+1; j < allGamePlayersArray.length; j++) {
                if (allGamePlayersArray[j].getKills() > allGamePlayersArray[position].getKills()) {
                    position = j;
                }
            }

            if (position != i) {
                Player aux = allGamePlayersArray[i];
                allGamePlayersArray[i] = allGamePlayersArray[position];
                allGamePlayersArray[position] = aux;
            }
        }

        for (int i = 0; i < allGamePlayersArray.length; i++) {
            System.out.println("--------------------------------------------------------------------------------------");
            System.out.printf("%-7d %-5d kills | %-30s\n", i+1, allGamePlayersArray[i].getKills(), allGamePlayersArray[i].getName());
            System.out.println("--------------------------------------------------------------------------------------");
        }

        return "";
    }

    public static Player[] allGamePlayersToArray() {
        int size = allGamePlayers.size();

        Player[] array = new Player[size];

        for (int i = 0; i < size; i++)
            array[i] = allGamePlayers.get(i);

        return array;
    }
}