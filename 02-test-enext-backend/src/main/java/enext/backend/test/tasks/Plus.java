package enext.backend.test.tasks;

public class Plus {

    public static void executar() {
        for (int i = 0, len = LogParser.getGames().size(); i < len; i++)
            System.out.println(LogParser.getGames().get(i).killModesReport(i+1));
    }
}