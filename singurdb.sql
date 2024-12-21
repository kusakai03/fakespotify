-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th12 21, 2024 lúc 04:10 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `singurdb`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sfollower`
--

CREATE TABLE `sfollower` (
  `userID` varchar(12) NOT NULL,
  `followID` varchar(12) NOT NULL,
  `followDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `sfollower`
--

INSERT INTO `sfollower` (`userID`, `followID`, `followDate`) VALUES
('acc52a27703a', 'acc5a7d3d52e', '2024-12-19 23:18:02');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `slikedmusic`
--

CREATE TABLE `slikedmusic` (
  `userID` varchar(12) NOT NULL,
  `songID` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `slikedmusic`
--

INSERT INTO `slikedmusic` (`userID`, `songID`) VALUES
('acc52a27703a', 'surddaf870b2'),
('acc52a27703a', 'sur3258a73b5');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `smusic`
--

CREATE TABLE `smusic` (
  `songID` varchar(12) NOT NULL,
  `songName` varchar(200) NOT NULL,
  `songGenre` text NOT NULL,
  `songArtist` varchar(200) NOT NULL,
  `songPath` varchar(200) NOT NULL,
  `uploadDate` datetime NOT NULL DEFAULT current_timestamp(),
  `userID` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `smusic`
--

INSERT INTO `smusic` (`songID`, `songName`, `songGenre`, `songArtist`, `songPath`, `uploadDate`, `userID`) VALUES
('sur1890e5d70', 'Tôi Là Tôi 2', 'Pop, Ballad', 'Quách Thành Danh', '1734784640425-.mp3', '2024-12-21 19:37:20', 'acc5a7d3d52e'),
('sur3258a73b5', 'Bao tiền một mớ bình yên', 'Pop, Ballad', '14 Casper, Bon Nghiêm', '1734271697288-.m4a', '2024-12-15 21:08:17', 'acc52a27703a'),
('sur94999c421', 'Ừ có anh đây', 'Ballad, Pop', 'Tino', '1734791457994-.mp3', '2024-12-21 21:30:58', 'acc5a7d3d52e'),
('sura50dc8dde', '​this is what autumn feels like', 'Pop, Ballad', 'JVKE', '1734788515093-.mp3', '2024-12-21 20:41:55', 'acc5a7d3d52e'),
('surd7e3e6de5', 'Quên cách yêu', 'Ballad', 'Lương Bích Hữu', '1734789390166-.mp3', '2024-12-21 20:56:30', 'acc5a7d3d52e'),
('surddaf870b2', 'GRAZE THE ROOF', 'Chiptune', 'LAURA SHIGIHARA', '1734360536814-.mp3', '2024-12-16 21:48:56', 'acc52a27703a'),
('surf824f9f29', 'Die with a smile', 'Pop', 'Bruno Mars, Lady Gaga', '1734511791211-.mp3', '2024-12-18 15:49:51', 'acc5a7d3d52e');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `smusicpart`
--

CREATE TABLE `smusicpart` (
  `songID` varchar(12) NOT NULL,
  `songImage` varchar(200) DEFAULT NULL,
  `songStream` int(11) NOT NULL,
  `songLike` int(11) NOT NULL,
  `songLyric` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `smusicpart`
--

INSERT INTO `smusicpart` (`songID`, `songImage`, `songStream`, `songLike`, `songLyric`) VALUES
('sur3258a73b5', '1734271697314-.jpg', 72, 1, 'Mười giờ, văn phòng vẫn sáng đèn\r\nLại một hôm làm thâu suốt đêm\r\nBàn chân đau mỏi nhức\r\nTựa lưng em chợp mắt\r\nDặn lòng: “Vì cuộc sống êm đẹp”\r\nHạnh phúc không đâu cách xa\r\nMà ta cứ đi tìm\r\nVậy xin em một lần\r\nTự yêu thương lấy mình\r\nMột ngày em được mấy bữa cơm?\r\nĐợt này công việc có tốt hơn?\r\nCòn ai hay gièm pha?\r\nCòn ai luôn rầy la mà xót xa, oà lên khóc vô vọng?\r\nCành lá đông qua sẽ rơi\r\nKhổ đau sẽ vơi, đời buồn sẽ qua\r\nMưa tạnh, may tan, trời quang\r\nXin đừng buông xuôi dễ dàng'),
('surddaf870b2', '1734360536835-.jpg', 16, 1, '[instrumental]'),
('surf824f9f29', '1734511791244-.jpg', 8, 0, '[Verse 1: Bruno Mars]\r\nI, I just woke up from a dream\r\nWhere you and I had to say goodbye\r\nAnd I don\'t know what it all means\r\nBut since I survived, I realized\r\n\r\n[Pre-Chorus: Bruno Mars]\r\nWherever you go, that\'s where I\'ll follow\r\nNobody\'s promised tomorrow\r\nSo I\'ma love you every night like it\'s the last night\r\nLike it\'s the last night\r\n\r\n[Chorus: Bruno Mars]\r\nIf the world was ending\r\nI\'d wanna be next to you\r\nIf the party was over\r\nAnd our time on Earth was through\r\nI\'d wanna hold you just for a while\r\nAnd die with a smile\r\nIf the world was ending\r\nI\'d wanna be next to you\r\n\r\n[Post-Chorus: Bruno Mars]\r\n(Ooh, ooh)\r\n[Verse 2: Lady Gaga, Lady Gaga & Bruno Mars]\r\nOoh, lost, lost in the words that we scream\r\nI don\'t even wanna do this anymore\r\n\'Cause you already know what you mean to me\r\nAnd our love\'s the only war worth fighting for\r\n\r\n[Pre-Chorus: Lady Gaga & Bruno Mars]\r\nWherever you go, that\'s where I\'ll follow\r\nNobody\'s promised tomorrow\r\nSo I\'ma love you every night like it\'s the last night\r\nLike it\'s the last night\r\n\r\n[Chorus: Lady Gaga & Bruno Mars, Lady Gaga]\r\nIf the world was ending\r\nI\'d wanna be next to you\r\nIf the party was over\r\nAnd our time on Earth was through\r\nI\'d wanna hold you just for a while\r\nAnd die with a smile\r\nIf the world was ending\r\nI\'d wanna be next to you\r\n\r\n[Bridge: Bruno Mars, Lady Gaga & Both]\r\nRight next to you\r\nNext to you\r\nRight next to you\r\nOh-oh\r\n[Chorus: Lady Gaga, Lady Gaga & Bruno Mars, Bruno Mars]\r\nIf the world was ending\r\nI\'d wanna be next to you\r\nIf the party was over\r\nAnd our time on Earth was through\r\nI\'d wanna hold you just for a while\r\nAnd die with a smile\r\nIf the world was ending\r\nI\'d wanna be next to you\r\nIf the world was ending\r\nI\'d wanna be next to you\r\n\r\n[Outro: Bruno Mars, Lady Gaga & Bruno Mars]\r\n(Ooh, ooh)\r\nI\'d wanna be next to you'),
('sur1890e5d70', '1734784640443-.jpg', 2, 0, 'Từng ngày từng ngày mình ta trốn cuối góc vắng\r\nLy cà phê riêng ta cô đơn không còn ai sớt chia vui buồn\r\nBỏ thật nhiều đường mà cà phê vẫn thấy chát đắng\r\nKhi nhìn quanh không ai bên ta đắng đầu môi đắng vào trong tim\r\n\r\nTừng ngày cuộc tình mình tan vỡ giữa những sóng gió\r\nEm giờ đây theo ai phương xa chôn vùi bao tháng năm êm đềm\r\nBỏ lại một người ngày và đêm vẫn tiếc vẫn nhớ\r\nMưa buồn rơi trong con tim cô biết về đâu đôi chân bơ vơ\r\nCà phê đắng sâu trong lòng ta\r\nNgười bước đi chia đôi tình ta\r\nNgày hôm qua trôi xa thật xa\r\nHình bóng ấy vẫn chưa nhạt nhòa\r\n\r\nCà phê đắng riêng ta mà thôi\r\nNgồi đếm mưa trong đêm dần trôi\r\nDù hôm nay đi trong lẻ loi\r\nDù cay đắng vẫn nói một lời tôi là tôi'),
('sura50dc8dde', '1734788515108-.jpg', 2, 0, '[Verse 1]\r\nLove is a walk in the park\r\nThat\'s how I feel at the start\r\nPretty until it gets dark\r\nLove is a walk in the park\r\n\'Til you get bit by a dog\r\nI never knew you could bark\r\n\r\n[Pre-Chorus]\r\nWhen the seasons change\r\nYou won\'t feel the same at all\r\n\r\n[Chorus]\r\nBecause summer will turn into fall\r\nThen you\'ll leave me, you\'re gone\r\nYou don\'t need me at all\r\nLike the trees in the autumn breeze\r\nIt\'s ironic the way that you leave\r\n\r\n[Verse 2]\r\nLove is like riding a bike, scary, but then it\'s alright\r\nI got the hang of it, right? (No)\r\n\'Til you start moving too fast\r\nLook up and you\'re \'bout to crash\r\nWhy doesn\'t love еver last?\r\nSo call me a pessimist\r\nI think I\'m a rеalist living a lie\r\nEvery night that I hold you inside of these arms\r\nKnowing too well you\'ll move on\r\nAs soon as the warm weather\'s gone\r\n\r\n[Pre-Chorus]\r\nWhen the seasons change\r\nYou won\'t feel the same at all\r\n\r\n[Chorus]\r\nBecause summer will turn into fall\r\nThen you\'ll leave me, you\'re gone\r\nYou don\'t need me at all\r\nLike the trees in the autumn breeze\r\nIt\'s ironic the way that you leave\r\nOoh-ooh, ooh-aah\r\nLike the trees in the autumn breeze\r\nIt\'s ironic the way that you leave\r\n'),
('surd7e3e6de5', NULL, 12, 0, 'Từ bao lâu không thể nhớ em đã không nói yêu thương một ai\r\nGiận câu chia tay hay nước mắt rơi đêm đêm đầm đìa trên gối\r\nTừ khi anh bước ra đi, em không muốn nhớ điều gì\r\nMà vết thương trong em vẫn đau đấy thôi.\r\n\r\nĐể quên anh, em đã cố quên những năm tháng bên anh buồn vui\r\nNụ hôn trên môi hay cái nắm tay bên nhau ngọt ngào khi ấy\r\nMà em quên trái tim em vẫn còn cần lắm yêu thương\r\nNhưng vì anh từ lâu tình yêu với em thật bình thường.\r\n\r\n[ĐK:]\r\nTừ lúc anh đi vội vàng em bàng hoàng em giật mình em hoang mang\r\nLà lỗi do em hay là do anh đã đổi thay âm thầm\r\nEm càng níu tay anh thì anh lại càng buông tay\r\nĐể cho em chơi vơi giữa đời quá đắng cay.\r\n\r\nTừ đó em không còn yêu, em lạnh lùng, em chẳng buồn, em không vui\r\nHọc cách quên anh theo thời gian trôi cũng đã quên anh rồi\r\nNhưng rồi trái tim em giờ đây chẳng thể yêu ai\r\nQuên được anh, em cũng quên cách để em yêu một người.'),
('sur94999c421', '1734791458038-.jpg', 4, 0, 'Anh chàng ôm gối nằm\r\nNghĩ suy về cô gái\r\nAnh thầm yêu cô ấy\r\nCũng lâu lắm rồi nhưng chưa thành đôi\r\n\r\nNhiều lần anh nằm mơ thấy nàng\r\nNắm tay đi bên người khác\r\nGiật mình ra mồ hôi ướt đẫm\r\nCứ như thế này sống sao bây giờ\r\n\r\nAnh chàng cũng mấy lần\r\nNói dăm ba câu lại thôi\r\nChấp nhận làm chàng trai\r\nĐóng vai anh hai\r\n\r\nĐể gần cô gái\r\nVà giờ anh lại ôm gối nằm\r\nNghĩ suy về cô ấy\r\nThôi thầm yêu mãi mãi\r\nCó khi vẫn hơn bị chối từ\r\n\r\nRồi khi em khóc - uh có anh đây\r\nMột khi vấp ngã - uh có anh đây\r\nRồi khi em muốn có ai bên cạnh\r\nĐể em khóc thật lớn để vơi nỗi buồn\r\nCánh tay anh này\r\nTrái tim anh này\r\nUh Có anh đây\r\n\r\nÔi mùa mưa tới rồi\r\nChàng trai vẫn nằm ôm gối\r\nCô nàng bên anh trai\r\nCó thêm đôi vai\r\n\r\nDựa vào êm ái\r\nMột ngày kia người ta thấy nàng\r\nSánh đôi đi bên người khác\r\nChàng lặng nghe mồ hôi ướt đẫm\r\nCứ như thế này sống sao bây giờ\r\n\r\nAnh chàng ôm đoá hồng\r\nBước qua nhà cô gái\r\nThôi thì liều một phen\r\nNói ra một lần không còn hối tiếc\r\n\r\nVà giờ đây tận mắt thấy nàng\r\nNắm tay hôn môi người khác\r\nHọ bên nhau thì thầm với nhau\r\nChính là những điều\r\nAnh muốn nói với nàng\r\n\r\nRồi khi em khóc - uh có anh đây\r\nMột khi vấp ngã - uh có anh đây\r\nRồi khi em muốn có ai bên cạnh\r\nĐể em khóc thật lớn để vơi nỗi buồn\r\nCánh tay anh này\r\nTrái tim anh này\r\nUh Có anh đây\r\n\r\nQua mùa mưa mất rồi\r\nChẳng ai thấy chàng trai ấy\r\nCô nàng chẳng mấy chốc\r\nĐã đi theo chồng\r\n\r\nNgôi nhà bỏ không\r\nChẳng lâu sau\r\nNgười ta tới tìm\r\nĐể đưa cô một lá thư\r\nNhưng chẳng tìm được cô\r\nLá thư trả về trên ban thờ chàng\r\n\r\nBao người tới tiễn chàng\r\nChỉ không thấy mình cô gái\r\nCô chẳng hề hay biết\r\nĐã có một người\r\nYêu mình đến thế\r\nMở bao thư người ta thấy chàng\r\nViết dăm ba câu gửi cô\r\nVậy là chàng trai đành lòng nhắm mắt\r\nLá thư cuối cùng\r\nNói thay lởi chàng\r\n\r\nRồi khi em khóc - uh có anh đây\r\nMột khi vấp ngã - uh có anh đây\r\nRồi khi em muốn có ai bên cạnh\r\nĐể em khóc thật lớn để vơi nỗi buồn\r\n\r\nCánh tay anh này\r\nTrái tim anh này\r\nUh Có anh đây\r\n\r\nCần lau nước mắt - uh có anh đây\r\nChùn chân mỏi gối - uh có anh đây\r\nMột ngày em có bước đi theo người\r\nChẳng cần anh ở bên sẻ chia ngọt bùi\r\nCánh tay anh này\r\nTrái tim anh này\r\nUh Có anh đây');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `splaylist`
--

CREATE TABLE `splaylist` (
  `playlistID` varchar(12) NOT NULL,
  `userID` varchar(12) NOT NULL,
  `playlistCreateDate` datetime NOT NULL DEFAULT current_timestamp(),
  `playlistName` varchar(200) NOT NULL,
  `playlistPublic` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `splaylist`
--

INSERT INTO `splaylist` (`playlistID`, `userID`, `playlistCreateDate`, `playlistName`, `playlistPublic`) VALUES
('pl0c82e415c', 'acc5a7d3d52e', '2024-12-18 21:23:44', 'nhaccuatui', 1),
('pl30fb3d968', 'acc52a27703a', '2024-12-19 20:01:36', 'nhaccuatui', 1),
('plb704dcf00', 'acc52a27703a', '2024-12-19 23:11:46', 'nhac cua toi', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `splaylistsong`
--

CREATE TABLE `splaylistsong` (
  `songID` varchar(12) NOT NULL,
  `playlistID` varchar(12) NOT NULL,
  `addDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `splaylistsong`
--

INSERT INTO `splaylistsong` (`songID`, `playlistID`, `addDate`) VALUES
('sur3258a73b5', 'plb704dcf00', '2024-12-19 23:15:02'),
('sur3258a73b5', 'plb704dcf00', '2024-12-19 23:16:06');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `ssongcomment`
--

CREATE TABLE `ssongcomment` (
  `cmtID` varchar(12) NOT NULL,
  `songID` varchar(12) NOT NULL,
  `userID` varchar(12) NOT NULL,
  `cmt` varchar(6000) NOT NULL,
  `cmtDate` datetime NOT NULL DEFAULT current_timestamp(),
  `cmtLike` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `ssongcomment`
--

INSERT INTO `ssongcomment` (`cmtID`, `songID`, `userID`, `cmt`, `cmtDate`, `cmtLike`) VALUES
('cmt269d8fe70', 'sur3258a73b5', 'acc52a27703a', 'Bài này hay lắm', '2024-12-19 22:37:17', 10);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suser`
--

CREATE TABLE `suser` (
  `userID` varchar(12) NOT NULL,
  `username` varchar(200) NOT NULL,
  `userRegisterDate` datetime NOT NULL DEFAULT current_timestamp(),
  `userMail` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `suser`
--

INSERT INTO `suser` (`userID`, `username`, `userRegisterDate`, `userMail`) VALUES
('acc52a27703a', 'pikachu123', '2024-12-15 19:13:12', '$2b$10$6fJ4492coOUt6qlJfLCKbuMa/4eANVlyhSt7yWUEJMKwbJt9qqOqW'),
('acc5a7d3d52e', 'sadoa035', '2024-12-14 22:30:09', '$2b$10$zMUYXZwG1ZEdIW8eSTkJSudIoWFmxub28kKGYXYreBEgoreh7qJ9S');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suserpart`
--

CREATE TABLE `suserpart` (
  `userID` varchar(12) NOT NULL,
  `userNickname` varchar(200) DEFAULT NULL,
  `userPassword` varchar(100) NOT NULL,
  `userPFP` text DEFAULT NULL,
  `userDescription` varchar(2000) DEFAULT NULL,
  `userFollower` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `suserpart`
--

INSERT INTO `suserpart` (`userID`, `userNickname`, `userPassword`, `userPFP`, `userDescription`, `userFollower`) VALUES
('acc5a7d3d52e', NULL, '$2b$10$zMUYXZwG1ZEdIW8eSTkJSudIoWFmxub28kKGYXYreBEgoreh7qJ9S', NULL, NULL, 1),
('acc52a27703a', 'Thiểm Lôi', '$2b$10$6fJ4492coOUt6qlJfLCKbuMa/4eANVlyhSt7yWUEJMKwbJt9qqOqW', '1734450783814-.jpg', 'tôi đăng nhạc cho vui', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `smusic`
--
ALTER TABLE `smusic`
  ADD PRIMARY KEY (`songID`);

--
-- Chỉ mục cho bảng `smusicpart`
--
ALTER TABLE `smusicpart`
  ADD KEY `key_link` (`songID`);

--
-- Chỉ mục cho bảng `splaylist`
--
ALTER TABLE `splaylist`
  ADD PRIMARY KEY (`playlistID`);

--
-- Chỉ mục cho bảng `splaylistsong`
--
ALTER TABLE `splaylistsong`
  ADD KEY `playlistsong` (`playlistID`);

--
-- Chỉ mục cho bảng `ssongcomment`
--
ALTER TABLE `ssongcomment`
  ADD PRIMARY KEY (`cmtID`),
  ADD KEY `fk_songid` (`songID`);

--
-- Chỉ mục cho bảng `suser`
--
ALTER TABLE `suser`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `UNIQUE` (`username`),
  ADD UNIQUE KEY `MailUnique` (`userMail`);

--
-- Chỉ mục cho bảng `suserpart`
--
ALTER TABLE `suserpart`
  ADD KEY `userkey_link` (`userID`);

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `smusicpart`
--
ALTER TABLE `smusicpart`
  ADD CONSTRAINT `key_link` FOREIGN KEY (`songID`) REFERENCES `smusic` (`songID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `splaylistsong`
--
ALTER TABLE `splaylistsong`
  ADD CONSTRAINT `playlistsong` FOREIGN KEY (`playlistID`) REFERENCES `splaylist` (`playlistID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `ssongcomment`
--
ALTER TABLE `ssongcomment`
  ADD CONSTRAINT `fk_songid` FOREIGN KEY (`songID`) REFERENCES `smusic` (`songID`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `suserpart`
--
ALTER TABLE `suserpart`
  ADD CONSTRAINT `userkey_link` FOREIGN KEY (`userID`) REFERENCES `suser` (`userID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
