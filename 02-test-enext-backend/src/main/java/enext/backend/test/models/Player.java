package enext.backend.test.models;

public class Player {
    private String name;
    private int kills;


    public Player(String name, int kills) {
        this.setName(name);
        this.setKills(kills);
    }


    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getKills() {
        return this.kills;
    }

    public void setKills(int kills) {
        this.kills = Math.abs(kills);
    }


    public String toString() {
        return "\"" + this.getName() + "\": " + this.getKills();
    }
}