package enext.backend.test.models;

import java.util.ArrayList;

public class Game {
    private static final String worldPlayer = "<world>";
    private final ArrayList<Player> players = new ArrayList<Player>();
    private final ArrayList<KillMode> killModes = new ArrayList<KillMode>();
    private int totalKills = 0;


    public void setTotalKills() {
        this.totalKills++;
    }

    public ArrayList<KillMode> getKillsModes() {
        return this.killModes;
    }

    public void setKillMode(String killModeName) {
        boolean hasKillMode = false;

        for (KillMode aux : this.killModes)
            if (aux.getMode().equals(killModeName))
                hasKillMode = true;

        if (!hasKillMode)
            this.killModes.add(new KillMode(killModeName, 0));
    }

    public void updateKillMode(String killModeName) {
        for (KillMode aux : this.killModes)
            if (aux.getMode().equals(killModeName))
                aux.setQuantity(aux.getQuantity() + 1);
    }

    public ArrayList<Player> getPlayers() {
        return this.players;
    }

    public void setPlayer(String playerName) {
        boolean hasPlayer = false;

        for (Player aux : this.players)
            if (aux.getName().equals(playerName))
                hasPlayer = true;

        if (!hasPlayer && !playerName.equals(worldPlayer))
            this.players.add(new Player(playerName, 0));
    }

    public void updatePlayersKills(String playerName1, String playerName2) {
        if (playerName1.equals(worldPlayer)) {
            for (Player aux : this.players)
                if (aux.getName().equals(playerName2))
                    aux.setKills(aux.getKills() - 1);
        }
        else {
            for (Player aux : this.players)
                if (aux.getName().equals(playerName1))
                    aux.setKills(aux.getKills() + 1);
        }
    }




    public String gameReport(int gameNumber) {
        return "game_" + Math.abs(gameNumber) + ": {\n"
                + "\ttotal_kills: " + this.totalKills + ";\n"
                + "\tplayers: " + this.formatGamePlayers() + "\n"
                + "\tkills: " + this.formatGamePlayersScore() + "\n"
                + "}";
    }

    public String formatGamePlayers() {
        String playersFormated = "";


        playersFormated += '[';

        int playersSize = this.players.size();

        if (playersSize > 0) {
            playersFormated += this.players.get(0).getName();

            for (int i = 1; i < playersSize; i++)
                playersFormated += ", " + this.players.get(i).getName();
        }

        playersFormated += ']';


        return playersFormated;
    }


    public String formatGamePlayersScore() {
        int playersSize = this.players.size();

        if (playersSize == 0)
            return "{}";


        String playersFormated = "";

        playersFormated += "{\n";
        playersFormated += "\t\t" + this.players.get(0).toString();
        for (int i = 1; i < playersSize; i++)
            playersFormated += ",\n\t\t" + this.players.get(i).toString();
        playersFormated += "\n\t}";

        return playersFormated;
    }



    public String killModesReport(int gameNumber) {
        return "game_" + Math.abs(gameNumber) + ": {\n"
                + "\tkills_by_means: " + this.formatkillModes() + "\n"
                + "}";
    }

    public String formatkillModes() {
        int killModesSize = this.killModes.size();

        if (killModesSize == 0)
            return "{}";


        String killModesFormated = "";

        killModesFormated += "{\n";
        killModesFormated += "\t\t" + this.killModes.get(0).toString();
        for (int i = 1; i < killModesSize; i++)
            killModesFormated += ",\n\t\t" + this.killModes.get(i).toString();
        killModesFormated += "\n\t}";

        return killModesFormated;
    }
}