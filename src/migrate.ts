import path from "path";
import fs from "fs";

(function() {
    // foloseste process.argv sa iei command line arguments din npm run blabla
    // o sa fie un array care MEREU contine in index 0 si 1 ceva ce nu imi trebuie
        // adica path spre node.exe si path spre scriptul care ruleaza
    // console.log('hfjhbdsfdskjlblfsd', process.argv);
    if (process.argv.length === 2) {
        throw new Error("Ai uitat sa dai argumentele necesare. Primul argument: numele migratiei.")
    }

    const processArgs = process.argv.slice(2);
    const currentWorkingDir: string = path.resolve('');
    const migrationsFilePath: string = path.normalize(path.resolve('./migrationsHistory.json'));
    const migrationsFolderPath: string = path.normalize(path.resolve("./src/migrations"));

    const migrationName = processArgs[0];
    const migrationsFile = JSON.parse(fs.readFileSync(migrationsFilePath).toString());
    const migrationsFolderStructure = fs.readdirSync(migrationsFolderPath);
    
    let migrationNumber = 0;
    for(let i = 0; i < migrationsFolderStructure.length; i++) {
        // console.log(migrationsFolderStructure[i]);
        const entryStat = fs.lstatSync(path.normalize(path.resolve(migrationsFolderPath, migrationsFolderStructure[i])));
        if (entryStat.isDirectory()) {
            migrationNumber = parseInt(migrationsFolderStructure[i].split(" ")[0]);
        }
        console.log(entryStat.isDirectory());
        // console.log("folosita", migrationsFile[migrationsFolderStructure[i]]);    
    }

    let newMigrationFolderName: string;
    if(migrationNumber < 10) {
        newMigrationFolderName = `0${migrationNumber+1}. ${migrationName}`;
        migrationsFile[newMigrationFolderName] = false;
    } else {
        newMigrationFolderName = `${migrationNumber+1}. ${migrationName}`;
        migrationsFile[newMigrationFolderName] = false;
    }
    
    fs.mkdirSync(`${migrationsFolderPath}/${newMigrationFolderName}`);
    fs.writeFileSync(migrationsFilePath, JSON.stringify(migrationsFile));
    
    // fs.readdir(migrationsFolderPath, (err, list) => {
    //     if (err) {
    //         console.log("err");
    //     } else {
    //         console.log("list", list);
    //         console.log(path.normalize(path.resolve(migrationsFolderPath, list[0])));
            
    //     }

    // });
    // fs.readFile(migrationsFilePath, 'utf8', function (err,data) {
    //     if (err) {
    //       return console.log(err);
    //     }
    //     console.log(data);
    //   });
    
    // console.log('root', currentWorkingDir);
    // console.log(path.join(path.resolve(process.cwd(), "migrationsHistory.json")));
    // console.log(process.cwd());
    
    
    
})();